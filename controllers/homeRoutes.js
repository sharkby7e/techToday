const router = require("express").Router();
// const hasAuth = require('../utils/hasAuth')

router.get("/", async (req, res) => {
  res.render("homepage");
});

router.get("/login", async (req, res) => {
  res.render("loginPage");
});

router.get("/signUp", async (req, res) => {
  res.render("signUp");
});
module.exports = router;
