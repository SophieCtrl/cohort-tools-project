const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

// Middleware to check for authentication (add this if needed)
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/:userId", isAuthenticated, (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    })
    .catch((err) =>
      res.status(500).json({ message: "Failed to retrieve user" })
    );
});

module.exports = router;
