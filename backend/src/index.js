const express = require("express");
const cors = require("cors");

const Service = require("./ws/index.js");


const wss = new Service();
wss.setWs();
wss.connection();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running on Vercel!");
});

export default app;