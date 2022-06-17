if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
// require('dotenv').load() to
// require('dotenv').config()

const express = require("express");
const app = express();
const port = process.env.MY_APP_PORT;

const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routers/index");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layout/layout");
app.use(expressLayouts);
app.use(express.static("public"));


app.use("/", indexRouter);

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

// const port = process.env.MY_APP_PORT;

// app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.render("index.ejs");
// });
app.listen(port || 3000);
