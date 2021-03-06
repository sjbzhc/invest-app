const express = require("express");
const jwt = require("jwt-simple");
const router = express.Router();
const User = require("../models/user");
const config = require("../config");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

const storage = cloudinaryStorage({
  cloudinary,
  folder: "my-images",
  allowedFormats: ["jpg", "png", "gif"]
});

const parser = multer({ storage });

//parser.single("picture")
router.post("/signup", (req, res, next) => {
  // extract the info we need from the body
  // of the request
  const { username, name, familyName, password, role } = req.body;
  const { file } = req;
  const date = new Date();

  // create the new user
  // notice how we don't pass the password because
  // we're letting User.register add the hashed version
  // for us
  const user = new User({
    username,
    name,
    familyName,
    role,
    accountCreated: date
    //picture: file.secure_url
  });

  User.register(user, password, err => {
    if (err) {
      return res.status(400).json(err.message);
    }
    res.json({
      success: true,
      //token,
      name: user.name
      //picture: user.picture
    });
  });
});

// User.authenticate() returns a function
const authenticate = User.authenticate();
router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  // check if we have a username and password
  if (username && password) {
    // test if the credentials are valid
    authenticate(username, password, (err, user, failed) => {
      if (err) {
        // an unexpected error from the database
        return next(err);
      }
      if (failed) {
        // failed logging (bad password, too many attempts, etc)
        return res.status(401).json(failed.message);
      }
      if (user) {
        // success!! Save the user id
        // NEVER save the password here
        // the id is usually enough because we can get back
        // the actual user by fetching the database later
        const payload = {
          id: user.id
        };
        // generate a token and send it
        // this token will contain the user.id encrypted
        // only the server is able to decrypt it
        // for the client, this is just a token, he knows that
        // he has to send it
        const token = jwt.encode(payload, config.jwtSecret);
        res.json({
          token,
          name: user.name,
          id: user._id,
          role: user.role,
          picture: user.picture,
          riskAssessded: user.riskProfileCompleted
          //picture: user.picture
        });
      }
    });
  } else {
    // unauthorized error
    res.status(401).json("Username or password missing");
  }
});

module.exports = router;
