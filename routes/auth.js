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

  try {
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
          // passport - login the user
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
  } catch (error) {
    console.error("Error router signup", error);
  }
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

//linkedin routes

router.get("/api/auth/linkedin", passport.authenticate("linkedin"));

router.get(
  "api/auth/linkedin/callback",
  passport.authenticate("linkedin", {
    successRedirect: `${process.env.AUTH_URL}/userPage`,
    failureRedirect: `${process.env.AUTH_URL}login`,
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(`${process.env.AUTH_URL}/userPage`);
  }
);

//Github Routes

router.get("/api/auth/github", passport.authenticate("github"));

router.get(
  "/api/auth/github/callback",
  passport.authenticate("github", {
    successRedirect: `/feed`,
    failureRedirect: `/login`,
  })
);

router.delete("/api/auth/logout", (req, res) => {
  req.logout();
  res.json({ message: "Successful logout" });
});

router.get("/api/auth/loggedin", (req, res) => {
  res.json(req.user);
});

module.exports = router;
