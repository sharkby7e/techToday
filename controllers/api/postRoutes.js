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

router.put("/:id", auth, async (req, res) => {
  try {
    const update = await Post.update(
      {
        body: req.body.body,
      },
      {
        where: { id: req.params.id },
      }
    );
    res.status(200).json({ post: update, message: "Post updated" });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!post) {
      res.status(400).json({ message: "No post found" });
    }
    res.status(200).json(post);
  } catch (err) {
    try {
    } catch (error) {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
