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
    folowerCount: {
        type: Array,
        default: []
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("follower", PostSchema);