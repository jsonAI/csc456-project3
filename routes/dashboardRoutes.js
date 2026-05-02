const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");

// Dashboard (protected)
router.get("/dashboard", verifyToken, (req, res) => {
  res.render("dashboard", { user: req.user });
});

module.exports = router;