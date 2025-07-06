// HINTS:
// 1. Import express and axios

import express from "express";
import axios from "axios";

// 2. Create an express app and set the port number.

const app = express();
const port = 4000;
const API_URL = "https://secrets-api.appbrewery.com";
const authToken = "a59b1560-36ed-41d9-9008-6d01c82e5a6e";

const config = {
  headers: { Authorization: `Bearer ${authToken}` },
};

// 3. Use the public folder for static files.

app.use(express.static("public"));

// 4. When the user goes to the home page it should render the index.ejs file.
app.get("/", async (req, res) => {
  try{
    const response = await axios.get(`${API_URL}/random`);
    const result = JSON.stringify(response.data);
    console.log("Response data:", result);
    const secret = response.data.secret;
    const user = response.data.username;
    console.log("Secret:", secret);
    console.log("User:", user);
    res.render("index.ejs", { secret: secret, user: user });
  }
  catch (error) {
    console.error("Error fetching secret:", error);
    res.render("index.ejs", { secret: "Error fetching secret", user: "Error fetching user" });
  }
});


// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.
app.get("/", async (re,res)=>{
  
})


// 6. Listen on your predefined port and start the server.

app.listen(port, () => {
  console.log(`Server is running on url http://localhost:${port}`)
});
