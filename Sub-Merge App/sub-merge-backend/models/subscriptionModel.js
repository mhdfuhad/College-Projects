const mongoose = require("mongoose");

const subscriptionSchema = mongoose.Schema(
  {
    userID: {
      type: String,
      require: true,
    },
    platform: {
      type: String,
      require: true,
    },
    dateSubscribed: {
      type: String,
      require: true,
    },
    amount: {
      type: Number,
      require: true,
    },
    recurring: {
      type: Boolean,
      default: false,
    },
    tier: {
      type: String,
      require: true,
    },
    img: {
      type: String,
      require: true,
    },
    logo: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
