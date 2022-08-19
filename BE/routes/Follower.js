const Follower = require('./models/Follower')



router.post("/", async (req, res) => {
    const newFollower = new Follower(req.body);
    try {
      const savedFollower = await newFollower.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
  