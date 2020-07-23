require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
<<<<<<< HEAD
// const favicon = require('serve-favicon');
// const hbs = require('hbs');
=======
const favicon = require("serve-favicon");
const hbs = require("hbs");
>>>>>>> 924b3e95609bca6938d922e0ebfd54ffd0e707b9
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

const bcrypt = require("bcrypt");
const flash = require("connect-flash");

const dbConnection = require("./configs/db.config");
const connectToMongo = async () => await dbConnection();
connectToMongo();

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

const session = require("express-session");
const passport = require("passport");

require("./configs/passport");

const MongoStore = require("connect-mongo")(session);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true,
  })
);

<<<<<<< HEAD
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
=======
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));
>>>>>>> 924b3e95609bca6938d922e0ebfd54ffd0e707b9

// default value for title local
app.locals.title = "InvestHub";

app.use("/", require("./routes/index"));
<<<<<<< HEAD
app.use("/api/auth", require("./routes/auth"));
=======
>>>>>>> 924b3e95609bca6938d922e0ebfd54ffd0e707b9

module.exports = app;
