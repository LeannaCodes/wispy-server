const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");

const app = express();
const router = express.Router();

app.use(cors());

const PORT = process.env.PORT || 3005;

router.get("/", (request, response) => {
  console.log("hello world");
  response.status(200).send("Hello World");
});

router.get("/condition/:name", async (request, response) => {
  const { name } = request.params;

  const API = `https://api.nhs.uk/mental-health/conditions/${name}?subscription-key=${process.env.REACT_APP_SECONDARY_KEY}`;
  try {
    const result = await axios.get(API);
    // console.log(result.data.hasPart);
    response.status(200).send(result.data);
  } catch (error) {
    // console.log(error);
    response.status(500).send(error);
  }
});

app.use(`/.netlify/functions/api`, router);

module.exports.handler = serverless(app);
// old way: app.listen(PORT, () => console.log(`listening on port ${PORT}`));
