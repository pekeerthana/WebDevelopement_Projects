import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "postgres",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
let countries_visited = [];
let input_country =[];

db.query("select country_code from visited_countries",(err,res)=>{
    if(err){
      console.log(err.message);
    } else{
      res.rows.forEach((country) => {
      countries_visited.push(country.country_code);
    });
    }
  })

app.get("/", async (req, res) => {
  console.log(countries_visited)
  res.render("index.ejs",{countries: countries_visited,total: countries_visited.length})
  
});

app.post("/add",async(req,res)=>{
  console.log(req.body.country);
  const country = req.body.country.trim().toLowerCase();
  await db.query(
    "select country_code from countries where lower(country_name) = $1",
    [country],
    (err, result) => {
      if (err) {
        console.log(err.message);
        res.redirect("/");
      } else if (result.rows.length === 0) {
        console.log("Country not found");
        res.render("index.ejs",{countries: countries_visited,total: countries_visited.length,
          error:"Enter the country name"})
      } else {
        const input_country = result.rows[0];
        console.log(input_country.country_code);
        db.query(
          "insert into visited_countries(country_code) values($1)",
          [input_country.country_code],
          (err, insertResult) => {
            if (err) {
              console.log(err.message);
                res.render("index.ejs",{countries: countries_visited,total: countries_visited.length,
                  error: "Country already present"
                })

            } else {
              console.log("Inserted:", input_country.country_code);
              countries_visited.push(input_country.country_code)
              res.redirect("/");
              // Optionally update countries_visited here if you want immediate UI update
            }
          }
        );
      }
    }
  );
  
  // res.render("index.ejs",{countries: countries_visited.map(item=> item.country_code),total: countries_visited.length})
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
