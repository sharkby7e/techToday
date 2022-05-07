const router = require("express").Router();
// const hasAuth = require('../utils/hasAuth')

router.get("/", async (req, res) => {
  res.render("homepage");
});

module.exports = router;
