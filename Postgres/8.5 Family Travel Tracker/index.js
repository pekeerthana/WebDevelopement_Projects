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

let currentUserId = 1;

let users = [];
let countries = [];

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries");
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}
app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: "teal",
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/user", async (req, res) => {

  try{
    const result = await db.query("select * from users");
    const data = result.rows;
    data.forEach((user)=>{
      users.push(user);
    })
    res.render("index.ejs",
        {countries: countries,total: countries.length,users: data,color: "teal"});
  }
  catch (err){
    console.log(err);
  }
});

app.post("/new", async (req, res) => {
  const name = req.body.name;
  const color = req.body.color;
  console.log(req.body.name ,req.body.color);
  try {
      const result = await db.query(
        "INSERT INTO users (name,color) VALUES ($1,$2) returning name, color",
        [name,color]
      );
      const data = result.rows[0];

      
    } catch (err) {
      console.log(err);
    }



  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
