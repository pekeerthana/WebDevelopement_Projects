import express from 'express';

const app = express();
const PORT = 3000;
app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`); 
});

app.get("/",(req,res)=>{
  console.log(req.rawHeaders);
  res.send(
    "<h1>Hello</h1> <a href='/about'>About</a> <a href='/contact'>Contact</a");


});

app.get("/about",(req,res)=>{
  res.send("<p>I am Keertha</p>");
});

app.get("/contact",(req,res)=>{
  res.send("<p>Contact me at: 9999999999</p>");
});

