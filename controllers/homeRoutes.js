const router = require("express").Router();
const auth = require("../utils/auth");
const { Post, User, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    const postDb = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
      order: [["date_created", "DESC"]],
    });
    const posts = postDb.map((x) => x.get({ plain: true }));

    res.render("homepage", { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          separate: true,
          order: [["date_created", "DESC"]],
          include: [{ model: User, attributes: ["name"] }],
        },
      ],
    });

    const post = postData.get({ plain: true });
    res.render("postPage", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", auth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Post,
          separate: true,
          order: [["date_created", "DESC"]],
        },
      ],
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", { ...user, logged_in: true });
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
