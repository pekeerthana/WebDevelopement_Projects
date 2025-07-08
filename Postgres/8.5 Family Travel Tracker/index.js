import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 4000;

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



async function checkVisisted(id) {
  const result = await db.query("SELECT user_id,country_code,name,color FROM visited_countries JOIN users ON users.id = user_id where user_id = ($1) ",[id]);
  let countries = [];
  result.rows.forEach((user) => {
    countries.push(user.country_code);
  });
  return countries;
}

async function allUsers(){
  const data = await db.query("select id,name,color from users");
  let users = [];
  data.rows.forEach((user)=>{
    users.push(user);
  })
  return users;
}

async function getColor(id){
  const data = await db.query("select color from users where id = ($1) ",[id]);
  console.log(data.rows[0]?.color);
  return data.rows[0]?.color;

}

app.get("/", async (req, res) => {
  const countries = await checkVisisted(currentUserId); 
  const users = await allUsers();
  const color = await getColor(currentUserId);
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: color,
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];
  console.log(input);

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    console.log(currentUserId);
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code,user_id) VALUES ($1,$2)",
        [countryCode,currentUserId]
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
  const addValue = req.body.add;
  console.log(req.body);
  currentUserId = parseInt(req.body.user, 10);
  try{
  if(addValue === "new"){
    res.render("new.ejs");

  }
  else{
  res.redirect("/");
  }

  } catch(err){
    console.log(err);
  }



});

app.post("/new", async (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const color = req.body.color;
  try {
      const newUserId = await db.query(
        "INSERT INTO users (name,color) VALUES ($1,$2) returning id",
        [name,color]
      );
      currentUserId = newUserId.rows[0].id;
      res.redirect("/")
    } catch (err) {
      console.log(err);
    }

  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
