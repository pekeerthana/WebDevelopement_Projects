import express from 'express';
import ejs from 'ejs';

const app = express();
const port = 3000;
var message = "it's a weekday! Keep working hard!";

function getDay(req,res,next){
  const date = new Date();
  let day = date.getDay()+1;
 
  if (day === 0 || day === 6) {
    message = "it's the weekend! Good for you!";
  }
  next();
}
app.use(getDay);

app.get('/', (req, res) => {
  res.render("index.ejs", 
    { message: message });  
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

