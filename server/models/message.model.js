const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    edited: { type: Boolean, default: false },
    picture: {
      type: String,
    },
    video: {
      type: String,
    },
    liker: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "messages",
  }
);

module.exports = mongoose.model("Message", messageSchema);
