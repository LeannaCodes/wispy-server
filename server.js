const express = require("express");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3005;

app.get("/", (request, response) => {
  console.log("hello world");
  response.status(200).send("Hello World");
});

app.get("/condition/:name", async (request, response) => {
  const { name } = request.params;

  const API = `https://api.nhs.uk/mental-health/conditions/${name}?subscription-key=${process.env.REACT_APP_SECONDARY_KEY}`;
  try {
    const result = await axios.get(API);

    response.status(200).send(result.data);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
