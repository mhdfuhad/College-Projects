const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    interests: {
      type: [String],
      required: false,
      default: [],
    },
    password: {
      type: String,
      required: true,
    },
    subLimits: {
      type: Number,
      required: true,
      default: 10,
    },
    tier: {
      type: String,
      required: true,
      default: "Free",
    },
    subscribed: {
      type: [String],
      required: false,
      default: [],
    },
    friends: {
      type: [String],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Password hashing middleware
userSchema.pre("save", function (next) {
  var user = this;
  bcrypt
    .genSalt(10)
    .then((salt) => {
      // Hash the password, using the salt.
      bcrypt
        .hash(user.password, salt)
        .then((encrypted) => {
          user.password = encrypted;
          next();
        })
        .catch((err) => {
          console.log(`Error occurred when hashing. ${err}`);
        });
    })
    .catch((err) => {
      console.log(`Error occurred when salting. ${err}`);
    });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
