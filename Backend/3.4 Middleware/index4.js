import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({extended:true}));

var name= '';
var petname ='';

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req,res)=>{
  res.sendFile(__dirname + "/public/index.html");

});

app.post("/submit", (req, res) => {
  console.log(req.body);
  name = req.body.name;
  petname = req.body.pet;
  res.send(`Your name is ${name} and your pet's name is ${petname}`);
});

