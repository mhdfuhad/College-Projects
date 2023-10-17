const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    participants: {
      type: [String],
      required: true,
    },
    group: {
      type: Boolean,
      default: false,
    },
    host: {
      type: String,
    },
    conversationName: {
      type: String,
      default: "Conversation",
    },
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
