const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

const db_URL =
  "mongodb+srv://RosePinkDragon:Test123@nodejs.kmdkk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(db_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(4000, () => {
      console.log(`listening on port 4000`);
    });
  })
  .catch((err) => {
    console.log(error);
  });

// middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(morgan("dev"));

app.use("/blogs", blogRoutes);

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/create", (req, res) => {
  res.render("create", { title: "Create A Blog" });
});

app.get("/login", (req, res) => {
  res.render("login", { title: "login" });
});

app.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign Up" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "Lost Page" });
});
