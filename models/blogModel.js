const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    unique: [true, "That title has already been taken"],
  },
  snippet: {
    type: String,
    required: [true, "Sqnippet is required"],
  },
  body: {
    type: String,
    required: [true, "Body is required"],
  },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
