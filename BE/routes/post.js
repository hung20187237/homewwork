
const router = require("express").Router();
const Post = require('../models/Post')
const Account = require('../models/Accountfb')
const User = require('../models/User')

//create a Post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post.userId)
    console.log(req.body.userId)
    if (post.userId == req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the Post has been deleted");
    } else {
      res.status(403).json("you can delete only your Post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get posts on post
router.get("/:postId", async (req, res) => {
  try {
    const posts = await Post.find({ accountId: req.params.accountId });
    const users = []
    for(let i=0;i<posts.length;i++){
      const user = await User.findById(posts[i].userId)
      users.push(user)
    }
    res.status(200).json({posts,users});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;