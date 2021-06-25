const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Invalid Email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Minimum Lenght is Six Characters"],
  },
});

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.post("save", function (doc, next) {
  console.log("A New User was saved");
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await User.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("User Not Found");
  }
  throw Error("Incorrect Details");
};

const User = mongoose.model("User", userSchema);
module.exports = User;
