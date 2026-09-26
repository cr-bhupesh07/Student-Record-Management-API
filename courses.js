const express = require("express");

const router = express.Router();

let courses = [];

router.post("/", (req, res) => {
  const { name, duration } = req.body;

  if (!name || !duration) {
    return res.status(400).json({ message: "Name and duration are required" });
  }

  const course = {
    id: courses.length ? Math.max(...courses.map((course) => course.id)) + 1 : 1,
    name,
    duration
  };

  courses.push(course);
  res.status(201).json(course);
});

router.get("/", (req, res) => {
  res.json(courses);
});

module.exports = router;
