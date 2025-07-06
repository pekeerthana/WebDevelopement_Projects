import express from 'express';
import axios from 'axios';
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

const API_URL = "https://bhagavad-gita3.p.rapidapi.com/v2/";
const API_KEY = "292e50ba35mshb8d0114bf24cbc6p1a8ab5jsn5ccb6cf88a75";

app.use(express.static('public'));
const config = {
  headers: {
    "x-rapidapi-host": "bhagavad-gita3.p.rapidapi.com",
    "x-rapidapi-key": API_KEY,
  },
};

app.get('/', (req, res) => {
  res.render("index.ejs",{result: "Welcome to Bhagavad Gita API"});
});

app.post('/get-chapter', async (req, res) => {
  const chapterNumber = req.body.chapter_number;
  res.redirect(`/chapters/${chapterNumber}`);
});

app.get("/chapters/:chapterNumber", async (req, res) => {
  try {
    const chapterNum = req.params.chapterNumber;
    const response = await axios.get(
      `${API_URL}chapters/${chapterNum}/`,
      config
    );
    res.render("chapter.ejs", { result: response.data });
  } catch (error) {
    res.status(500).render("error.ejs", { error: error.message });
  }
});

app.get('/allchapters', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}chapters/`, config);
    res.render("allchapters.ejs", { result: response.data });
    
  } catch (error) {
    res.status(500).send(error.message);
  }
});




app.listen(port , () =>{
  console.log(`server is running on url http://localhost:${port}`);
});
