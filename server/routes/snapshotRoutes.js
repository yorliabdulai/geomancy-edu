const express = require("express");
const router = express.Router();
const Snapshot = require("../models/Snapshot");

// Posting snapshots
router.post("/add", async (req, res) => {
  try {
    console.log("snap");
    const snap = await Snapshot.create(req.body);
    res.status(201).json({ data: snap });
  } catch (error) {
    console.error("Error creating snapshot:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// Get snapshots by user_id and video_id
router.get("/get/:user_id/:video_id", async (req, res) => {
  const { user_id, video_id } = req.params;

  try {
    const snaps = await Snapshot.find({ user_id, video_id });
    if (snaps.length === 0) {
      return res.status(404).json({ msg: "No snapshots found for the given user and video" });
    }
    res.status(200).json({ data: snaps });
  } catch (error) {
    console.error("Error fetching snapshots:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;
