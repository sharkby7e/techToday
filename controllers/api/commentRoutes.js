const router = require("express").Router();
const { Comment } = require("../../models");
const auth = require("../../utils/auth");

router.post("/", auth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body, //should include post_id from current url
      user_id: req.session.user_id,
    });
    res
      .status(200)
      .json([{ comment: newComment, message: "New Comment created" }]);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
