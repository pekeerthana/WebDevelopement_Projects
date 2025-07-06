import express from "express";

const app = express();
const port = 3000;

app.use((req,res,next)=>{
  console.log(`${req.method} ${req.url} `);
  console.log("Request Headers:", req.headers);
  console.log("Request Body:", req.body);
  console.log("Response body", res.body);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
