const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Ensure usernames are unique
      trim: true,
      minlength: 3, // Minimum username length (adjust as needed)
      maxlength: 50, // Maximum username length (adjust as needed)
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure emails are unique
      trim: true,
      lowercase: true, // Convert emails to lowercase
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address."], // Email validation regex
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum password length (adjust as needed)
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set creation date
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

// Method to compare password (useful for login)
userSchema.methods.isValidPassword = async function (password) {
  const bcrypt = require("bcrypt");
  return await bcrypt.compare(password, this.password); // Compares stored password with entered password
};

// Method to hash password before saving to database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash the password if it's modified
  const bcrypt = require("bcrypt");
  const salt = await bcrypt.genSalt(10); // Generate salt
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  next();
});

// Create User model
const User = mongoose.model("User", userSchema);

module.exports = User;
