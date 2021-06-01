const express = require("express");
const app = express();

app.listen(4000, () => {
  console.log(`listening on port 4000`);
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  blogs = [
    {
      title: "This is Title",
      snippet: "This is snippet",
    },
    {
      title: "This is Title",
      snippet: "This is snippet",
    },
    {
      title: "This is Title",
      snippet: "This is snippet",
    },
  ];
  res.render("index", { title: "Blogs", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Page" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "Lost Page" });
});
