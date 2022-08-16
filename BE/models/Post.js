const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId:{
      type: String,
      required: true
    },
    accountId: {
      type: String,
      required: true,
    },
    accountname:{
      type: String,
      required: true,
      default: "Hung Tran"
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: Array,
      default: [],
    },
    video: {
      type: String,
    },
    status: {
      type: String,
      required: true
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);