import express from "express";
import axios from "axios";


const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "keerthana";
const yourPassword = "keerthana";
const yourAPIKey = "57fc3bbe-05b5-4fcf-b8d6-d93b4175428c";
const yourBearerToken = "a170d417-99af-4634-ae90-da753f29a9fe";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  console.log(`${API_URL}random`);

  const result = await axios.get(`${API_URL}random`);
  const secret = JSON.stringify(result.data);
  res.render("index.ejs", { content: secret });

});

app.get("/basicAuth", async (req, res) => {
  console.log(`${API_URL}all?page=2`);
  const result = await axios.get(`${API_URL}all?page=2`, {
    auth: {
      username: yourUsername,
      password: yourPassword,
    },
  });
  const secrets = JSON.stringify(result.data);
  res.render("index.ejs", { content: secrets });
});

app.get("/apiKey", async (req, res) => {
  const result = await axios.get(`${API_URL}filter`, {
    params: {
      "apiKey": yourAPIKey,
      "score": 3
    },
  });
  const secrets = JSON.stringify(result.data);
  res.render("index.ejs", { content: secrets });

});

app.get("/bearerToken", async (req, res) => {

  const result = await axios.get(`${API_URL}user-secrets`, {
    headers: {
      "Authorization" : `Bearer ${yourBearerToken}`,
    },
  });
  const secrets = JSON.stringify(result.data);
  console.log(result.data["error"]);
  if(results.data["error"]!== null ) {
    res.render("index.ejs", { content: "No secrets found for this user." });
  }
  else{
  res.render("index.ejs", { content: secrets });
  // https://stackoverflow.com/a/52645402
  }

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
