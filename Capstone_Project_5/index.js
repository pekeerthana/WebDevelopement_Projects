import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "booknotes",
  password: "postgres",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const API_URL = 'https://covers.openlibrary.org/b/id/8392798-L.jpg'

async function getCoverId() {
  const result = async
  
}

app.get(("/"), async (req,res)=>{
  const data = await db.query("select * from books");
  const books = data.rows;
  res.render("index.ejs",{books:books});

});

app.post(("/image"),async (req,res)=>{
  const response = axios.get(API_URL);
  console.log(response.body);
});

app.listen(port,()=>{
  console.log(`Server running on http://localhost:${port}`);
});



