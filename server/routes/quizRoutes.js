const express = require("express");
const router = express.Router();
const Player = require("../models/User.js");

// Get leaderboard
router.get("/leaderboard", async (req, res) => {
  try {
    const players = await Player.find().sort({ score: -1 });
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});
router.get("/quiz", (req, res) => {
  res.send("Quiz API works!");
});

// Submit score
router.post("/submit-score", async (req, res) => {
  const { name, score } = req.body;
  try {
    const player = new Player({ name, score });
    await player.save();
    res.json({ message: "Score submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit score" });
  }
});

module.exports = router;
