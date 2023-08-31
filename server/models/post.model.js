const mongoose = require("mongoose");

const replySchema = mongoose.Schema({
  replierId: {
    type: String,
    required: true,
  },
  replierPseudo: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
});

const commentSchema = mongoose.Schema({
  commenterId: {
    type: String,
    required: true,
  },
  commenterPseudo: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },

  likers: [{ type: String }],

  timestamp: {
    type: Number,
    required: true,
  },
  replies: [replySchema],
});

const postSchema = mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    picture: {
      type: String,
    },
    video: {
      type: String,
    },
    likers: [{ type: String }],

    comments: {
      type: [commentSchema],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", postSchema);
