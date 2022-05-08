const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
// const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// const hbs = exphbs.create({helpers});
// app.engine("handlebars", hbs.engine);
// app.set("view engine", "handlebars");

const hbs = exphbs.create({
  // helpers: helpers,
  extname: ".hbs",
});
console.log(hbs);
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

const sess = {
  secret: "SuperDuper Secreter Secret Secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sess));

app.use(routes);

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
