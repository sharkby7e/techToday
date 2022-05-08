const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
  console.log(req.body);
  res.json({ message: "hi" });
  // try {
  //   const user = await User.create(req.body);
  //   req.session.save(() => {
  //     req.session.user_id = user.id;
  //     req.session.logged_in = true;
  //     res
  //       .status(200)
  //       .json({ user: user, message: "User Created successfully" });
  //   });
  // } catch (err) {
  //   res.status(400).json(err);
  // }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      res.status(400).json({ message: "Please check your email and password" });
      return;
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
