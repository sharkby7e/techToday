const router = require("express").Router();
const { Post } = require("../../models");
const auth = require("../../utils/auth");

router.post("/", auth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json({ post: newPost, message: "New Post created" });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
