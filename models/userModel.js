const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Body is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  console.log(this.password);
  next();
});

userSchema.post("save", function (doc, next) {
  console.log("A New User was saved");
  console.log(doc);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
