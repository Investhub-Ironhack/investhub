require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
// const hbs = require('hbs');
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");

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
const db = mongoose.connection;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
      mongooseConnection: db,
      ttl: 24 * 60 * 60 * 1000,
    }),
  })
);

// Passport Setup
const User = require("./models/User");
const LocalStrategy = require("passport-local").Strategy;

// we serialize only the `_id` field of the user to keep the information stored minimum
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// when we need the information for the user, the deserializeUser function is called with the id that we previously serialized to fetch the user from the database
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((dbUser) => {
      done(null, dbUser);
    })
    .catch((err) => {
      done(err);
    });
});

app.use(flash());

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username })
      .then((found) => {
        if (found === null) {
          done(null, false, { message: "Wrong credentials" });
        } else if (!bcrypt.compareSync(password, found.password)) {
          done(null, false, { message: "Wrong credentials" });
        } else {
          done(null, found);
        }
      })
      .catch((err) => {
        done(err, false);
      });
  })
);

// Passport github strategy setup

const GithubStrategy = require("passport-github").Strategy;

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.ID_GIT,
      clientSecret: process.env.SECRET_GIT,
      callbackURL: `${process.env.AUTH_URL}/auth/github/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      // find a user with profile.id as githubId or create one
      User.findOne({ githubId: profile.id })
        .then((found) => {
          if (found !== null) {
            // user with that githubId already exists
            done(null, found);
          } else {
            // no user with that githubId
            return User.create({
              githubId: profile.id,
              displayName: profile.displayName,
              avatarUrl: profile.photos[0].value,
            }).then((dbUser) => {
              done(null, dbUser);
            });
          }
        })
        .catch((err) => {
          done(err);
        });
    }
  )
);

//Passport Google strategy setup

// const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

// // Use the GoogleStrategy within Passport.
// //   Strategies in Passport require a `verify` function, which accept
// //   credentials (in this case, an accessToken, refreshToken, and Google
// //   profile), and invoke a callback with a user object.
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: `${process.env.AUTH_URL}/auth/google/callback`, //google callback works with only referencial path.
//     },
//     (accessToken, refreshToken, profile, done) => {
//       console.log("google profile", profile);
//       // find a user with profile.id as googleId or create one
//       User.findOne({ googleId: profile.id })
//         .then((found) => {
//           if (found !== null) {
//             console.log(found);
//             // user with that googleId already exists
//             done(null, found);
//           } else {
//             // no user with that googleId
//             return User.create({
//               googleId: profile.id,
//               avatarUrl: profile.photos[0].value,
//               displayName: profile.displayName,
//             }).then((dbUser) => {
//               done(null, dbUser);
//             });
//           }
//         })
//         .catch((err) => {
//           done(err);
//         });
//     }
//   )
// );
//Passport Linkedin strategy setup

const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;

passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_API_KEY,
      clientSecret: process.env.LINKEDIN_SECRET_KEY,
      callbackURL: `${process.env.AUTH_URL}/auth/linkedin/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      // find a user with profile.id as linkedIn or create one
      User.findOne({ linkedinId: profile.id })
        .then((found) => {
          if (found !== null) {
            // user with that linkedIn already exists
            done(null, found);
          } else {
            // no user with that linkedIn
            return User.create({
              linkedinId: profile.id,
              displayName: profile.displayName,
              avatarUrl: profile.photos[0].value,
            }).then((dbUser) => {
              done(null, dbUser);
            });
          }
        })
        .catch((err) => {
          done(err);
        });
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());
// End of Passport Setup

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(cors());
app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true,
  })
);

//app.set("views", path.join(__dirname, "views"));
//app.set("view engine", "hbs");
//app.use(express.static(path.join(__dirname, "./client/build")));
//app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  console.log(`happenind?`);
  // Serve any static files
  app.use(express.static(path.join(__dirname, "/client/build")));
  // Handle React routing, return all requests to React app
}

// default value for title local
app.locals.title = "InvestHub";

app.use("/", require("./routes/index"));
app.use("/", require("./routes/auth"));
app.use("/api/articles", require("./routes/articles"));

if (process.env.NODE_ENV === "production") {
  app.use((req, res) => {    // If no routes match, send them the React HTML.    
    res.sendFile(__dirname + "/client/build/index.html");
  });  
}

module.exports = app;
