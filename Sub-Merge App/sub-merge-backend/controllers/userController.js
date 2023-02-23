const express = require("express");
const router = express.Router();
const passport = require("passport");
const userService = require("../services/user-service");
const generateToken = require("../utils/generateToken.js");
const { validationResult, body } = require("express-validator");

router.post(
  "/register",
  [
    body("firstName")
      .exists()
      .withMessage("First name is required")
      .isLength({ min: 2 })
      .withMessage("First name must be at least 2 characters"),
    body("lastName")
      .exists()
      .withMessage("Last name is required")
      .isLength({ min: 2 })
      .withMessage("Last name must be at least 2 characters"),
    body("username")
      .exists()
      .withMessage("Username is required")
      .isLength({ min: 2 })
      .withMessage("Username must be at least 2 characters"),
    body("email").isEmail().normalizeEmail().withMessage("Email is not valid"),
    body("password")
      .exists()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
      .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
      .withMessage(
        "Password must contain at least one lowercase letter, one uppercase letter, and one special character"
      ),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp({ message: errors });
    }
    try {
      await userService.RegisterUser(req.body).then((user) => {
        res.status(user.status).json({
          message: user.message,
          token: generateToken(user._id, user.email),
          _id: user._id,
        });
      });
    } catch (error) {
      res.status(error.status).json({
        status: "error",
        message: error.message,
      });
    }
  }
);

router.post(
  "/login",
  [body("email").isEmail().normalizeEmail().withMessage("Email is not valid")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp({ message: errors });
    }
    try {
      await userService.LoginUser(req.body).then((user) => {
        res.status(user.status).json({
          message: user.message,
          token: generateToken(user._id, user.email),
          _id: user._id,
        });
      });
    } catch (error) {
      res.status(error.status).json({
        status: "error",
        message: error.message,
      });
    }
  }
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      await userService.deleteUser(req.params).then((user) => {
        res.json({
          message: user.message,
          status: 202,
        });
      });
    } catch (error) {
      res.status(error.status).json({
        status: "error",
        message: error.message,
      });
    }
  }
);

// Secure route to get user data
router.get(
  "/profile/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      await userService.GetUser(req.params.id).then((user) => {
        res.status(user.status).json({
          message: user.message,
          user: user.userData,
        });
      });
    } catch (error) {
      res.status(error.status).json({
        status: "error",
        message: error.message,
      });
    }
  }
);

router.get(
  "/friend/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      await userService.GetUser(req.params.id).then((user) => {
        res.status(user.status).json({
          message: user.message,
          name: user.userData.firstName + " " + user.userData.lastName,
          username: user.userData.username,
        });
      });
    } catch (error) {
      res.status(error.status).json({
        status: "error",
        message: error.message,
      });
    }
  }
);

router.put(
  "/friend",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      await userService
        .AddFriend(req.body.id, req.body.friendEmail)
        .then((user) => {
          res.status(user.status).json(user);
        });
    } catch (error) {
      res.status(error.status).json({
        status: "error",
        message: error.message,
      });
    }
  }
);

router.delete(
  "/friend",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      await userService
        .RemoveFriend(req.body.id, req.body.friendId)
        .then((user) => {
          res.status(user.status).json(user);
        });
    } catch (error) {
      res.status(error.status).json({
        status: "error",
        message: error.message,
      });
    }
  }
);

router.put(
  "/profile/:id",
  [
    body("firstName")
      .exists()
      .withMessage("First name is required")
      .isLength({ min: 2 })
      .withMessage("First name must be at least 2 characters"),
    body("lastName")
      .exists()
      .withMessage("Last name is required")
      .isLength({ min: 2 })
      .withMessage("Last name must be at least 2 characters"),
    body("email").isEmail().normalizeEmail().withMessage("Email is not valid"),
  ],
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp({ message: errors });
    }
    try {
      await userService.UpdateUserProfile(req).then((user) => {
        res.status(user.status).json({
          message: user.message,
          status: user.status,
          user: user.userData,
        });
      });
    } catch (error) {
      res.status(error.status).json({
        status: "error",
        message: error.message,
      });
    }
  }
);

router.put(
  "/password/:id",
  [
    body("password")
      .exists()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
      .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
      .withMessage(
        "Password must contain at least one lowercase letter, one uppercase letter, and one special character"
      ),
  ],
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp({ message: errors });
    }
    try {
      await userService.UpdateUserPassword(req).then((user) => {
        res.status(user.status).json({
          message: user.message,
          status: user.status,
        });
      });
    } catch (error) {
      res.status(error.status).json({
        status: "error",
        message: error.message,
      });
    }
  }
);

router.get(
  "/interests/:id",
  passport.authenticate("jwt", { session: false }),
  [body("interests").exists().withMessage("Interests are required")],
  async (req, res) => {
    try {
      await userService.GetUserInterests(req.params.id).then((user) => {
        res.status(user.status).json({
          message: user.message,
          status: user.status,
          interests: user.interests,
        });
      });
    } catch (error) {
      res.status(error.status).json({
        status: "error",
        message: error.message,
      });
    }
  }
);

router.put(
  "/interests/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      await userService
        .AddUserInterest(req.params.id, req.body.interest)
        .then((user) => {
          res.status(user.status).json({
            message: user.message,
            status: user.status,
            interests: user.interests,
          });
        });
    } catch (error) {
      res.status(error.status).json({
        status: "error",
        message: error.message,
      });
    }
  }
);

router.delete(
  "/interests/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      await userService
        .RemoveUserInterest(req.params.id, req.body.interest)
        .then((user) => {
          res.status(user.status).json({
            message: user.message,
            status: user.status,
            interests: user.interests,
          });
        });
    } catch (error) {
      res.status(error.status).json({
        status: "error",
        message: error.message,
      });
    }
  }
);

router.put(
  "/limits/:id/increase",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      await userService.updateLimit(req).then((data) => {
        res.status(data.status).json({
          message: data.message,
          status: data.status,
        });
      });
    } catch (error) {
      res.status(error.status).json({
        status: "error",
        message: error.message,
      });
    }
  }
);

router.get(
  "/subscribed",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      await userService.GetUserSubscribed(req.user.id).then((data) => {
        res.status(data.status).json({
          message: data.message,
          status: data.status,
          subscribed: data.subscribed,
        });
      });
    } catch (error) {
      res.status(error.status).json({
        status: "error",
        message: error.message,
      });
    }
  }
);

module.exports = router;
