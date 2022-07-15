const router = require("express").Router();
const User = require('../models/User')
const Account = require('../models/Accountfb')


//add Account 
router.post("/", async (req, res) => {
  const newAccount = new Account(req.body);
  try {
    const savedAccount = await newAccount.save();
    res.status(200).json(savedAccount);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a account
router.delete("/:id", async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (account.userId === req.body.userId) {
      await account.deleteOne();
      res.status(200).json("the account has been deleted");
    } else {
      res.status(403).json("you can delete only your account");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user's all account
router.get("/accountfb/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const accounts = await Account.find({ userId: user._id });
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;