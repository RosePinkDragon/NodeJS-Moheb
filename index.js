const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const Blog = require("./models/blogModel");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const { checkUser } = require("./middleware/checkUser");

require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO_URL, {
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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(morgan("dev"));

app.get("*", checkUser);
app.use("/blogs", blogRoutes);
app.use(userRoutes);

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/create", (req, res) => {
  res.render("create", { title: "Create A Blog" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "Lost Page" });
});
