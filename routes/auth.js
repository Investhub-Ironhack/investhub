const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");

router.post("/api/auth/signup", (req, res) => {
  const { username, email, password } = req.body;

  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ message: "Your password must be 8 char. min." });
  }
  if (!username) {
    return res.status(400).json({ message: "Your username cannot be empty" });
  }

  User.findOne({ username: username })
    .then((found) => {
      if (found) {
        return res
          .status(400)
          .json({ message: "This username is already taken" });
      }

      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);
      return User.create({
        username: username,
        email: email,
        password: hash,
        avatarUrl: "https://www.computerhope.com/jargon/g/guest-user.jpg",
      }).then((dbUser) => {
        req.login(dbUser, (err) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error while attempting to login" });
          }
          res.json(dbUser);
        });
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/api/auth/login", (req, res) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Error while authenticating" });
    }
    if (!user) {
      return res.status(400).json({ message: "Wrong credentials" });
    }
    req.login(user, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error while attempting to login" });
      }

      return res.json(user);
    });
  })(req, res);
});

router.get(
  "/api/auth/linkedin",
  passport.authenticate("linkedin"),
  (req, res) => {
    console.log("happening");
  }
);

router.get(
  "api/auth/linkedin/callback",
  passport.authenticate("linkedin", {
    successRedirect: "http://localhost:3000/article",
    failureRedirect: "http://localhost:3000/login",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/article");
  }
);

router.delete("/api/auth/logout", (req, res) => {
  req.logout();
  res.json({ message: "Successful logout" });
  res.redirect("/");
});

router.get("/api/auth/loggedin", (req, res) => {
  res.json(req.user);
});

module.exports = router;
