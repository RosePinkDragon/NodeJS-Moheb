const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const Blog = require("./models/blogModel");

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

app.get("/", (req, res) => {
  Blog.find()
    .then((blogs) => {
      res.render("index", { title: "Home", blogs });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/add-blog", (req, res) => {
  const blog = req.body;
  console.log(body);

  blog
    .save()
    .then((blog) => {
      res.send(blog);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/single-blog/:id", (req, res) => {
  blogId = req.params.id;
  // 60ba26cc886c5b1ebc327484
  Blog.findById(blogId)
    .then((blog) => {
      res.send(blog);
    })
    .catch((err) => {
      console.log(err);
      res.render("404", { title: "blog not found" });
    });
});

app.delete("/delete/:id", (req, res) => {
  blogId = req.params.id;
  Blog.findByIdAndDelete(blogId)
    .then((blog) => {
      res.send(blog);
    })
    .catch((err) => {
      console.log(err);
    });
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
