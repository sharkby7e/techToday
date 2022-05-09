const router = require("express").Router();
const auth = require("../utils/auth");
const { Post, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const postDb = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    const posts = postDb.map((x) => x.get({ plain: true }));

    res.render("homepage", { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  res.render("loginPage");
});

router.get("/signUp", async (req, res) => {
  res.render("signUp");
});
module.exports = router;
