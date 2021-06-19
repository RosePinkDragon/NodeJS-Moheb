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
    required: [true, "Snippet is required"],
  },
  body: {
    type: String,
    required: [true, "Body is required"],
  },
});

blogSchema.pre("save", function (next) {
  console.log("A New Blog was saved");
  next();
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
