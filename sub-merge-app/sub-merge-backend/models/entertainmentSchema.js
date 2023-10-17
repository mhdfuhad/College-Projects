const mongoose = require("mongoose");

const entertainmentSchema = mongoose.Schema(
  {
    userID: {
      type: String,
      require: true,
    },
    id: {
      type: String,
      require: true,
    },
    originalTitle: {
      type: String,
      require: true,
    },
    imdbRating: {
      type: Number,
      require: true,
    },
    year: {
      type: Number,
      require: true,
    },
    runtime: {
      type: Number,
      require: true,
    },
    genres: {
      type: Array,
      require: true,
    },
    overview: {
      type: String,
      require: true,
    },
    posterPath: {
      type: String,
      require: true,
    },
    age: {
      type: String,
      require: true,
    },
    watchList: {
      type: Boolean,
      require: true,
      default: false,
    },
    favorite: {
      type: Boolean,
      require: true,
      default: false,
    },
    streamingInfo: {
      type: Object,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Entertainment = mongoose.model("Entertainment", entertainmentSchema);

module.exports = Entertainment;
