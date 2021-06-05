const Blog = require("../models/blogModel");

const blog_index = (req, res) => {
  Blog.find()
    .then((blog) => {
      console.log(blog);
      res.render("index", { blogs: blog, title: "Blogs Home" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_create_get = (req, res) => {
  res.render("create", { title: "Create a blog" });
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(() => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_details = (req, res) => {
  Blog.findById(req.params.id)
    .then((result) => {
      res.render("details", { blog: result, title: blog.title });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("404", { title: "Not Found" });
    });
};

const blog_delete = (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  blog_index,
  blog_create_get,
  blog_create_post,
  blog_details,
  blog_delete,
};
