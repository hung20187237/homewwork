const router = require("express").Router();
const Follower = require('../models/Follower')



router.post("/", async (req, res) => {
    const newFollower = new Follower(req.body);
    try {
      const savedFollower = await newFollower.save();
      res.status(200).json(savedFollower);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get("/allfolow/:accountId", async (req, res) => {
  try {
    const follows = await Follower.find({ accountId: req.params.accountId });
    res.status(200).json(follows);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
  