const express = require("express");
const data = require("./db/data");
const { syncAndSeed } = data;
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/assets", express.static("assets"));
app.use("/dist", express.static("dist"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", require("./routes/api/handles"));

const init = () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
  });
};

syncAndSeed();
init();
