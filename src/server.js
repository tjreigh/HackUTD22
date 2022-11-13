require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@hackutd22.cfgpdzf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
  const collection = client.db("");
});

app.get("/test", (req, res) => {
  res.send("success");
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
