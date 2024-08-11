const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");

// Signup user
router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hashedPassword });
    res.status(201).json({ data: user });
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username })
      .populate("enrolled_courses")
      .exec();

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return res.status(200).json({ data: user, msg: "User Log-In" });
    } else {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// Update user credentials
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  
  try {
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
    }

    const user = await User.findByIdAndUpdate(id, req.body, { new: true })
      .populate("enrolled_courses")
      .exec();

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ data: user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// Get user by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).populate("enrolled_courses").exec();

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ data: user });
  } catch (error) {
    console.error("Error fetching user by id:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// Get users by course_id
router.get("/usersByCourse/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const users = await User.find({ enrolled_courses: id });

    res.status(200).json({ data: users });
  } catch (error) {
    console.error("Error fetching users by course:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;
