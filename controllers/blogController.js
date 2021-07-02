const Blog = require("../models/blogModel");

// ** Handle Errors
const handleErrors = (err) => {
  let errors = { title: "", snippet: "", body: "" };

  if (err.code === 11000) {
    errors.title = "That title is already taken";
  }

  if (err.message.includes("validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const blog_index = (req, res) => {
  Blog.find()
    .then((blog) => {
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
  console.log(req.body);
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.json({ blog: result });
    })
    .catch((err) => {
      const errors = handleErrors(err);
      res.json({ errors });
    });
};

const blog_details = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.render("details", { blog: blog, title: blog.title });
  } else {
    res.status(404).render("404", { title: "Lost Blog" });
  }
};

const blog_delete = (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(() => {
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
