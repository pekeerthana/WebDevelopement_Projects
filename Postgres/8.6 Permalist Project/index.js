import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 4000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "postgres",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
let items = [];


app.get("/", async (req, res) => {
  const data = await db.query("select * from items");
  items = data.rows;
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  items.push({ title: item });
  await db.query("insert into items (title) values ($1)",[item])
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  console.log(req.body);
  await db.query("update items set title = ($1) where id =($2)",[req.body.updatedItemTitle,req.body.updatedItemId]);
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId
  console.log(id);
  await db.query("delete from items where id = ($1)",[id]);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
