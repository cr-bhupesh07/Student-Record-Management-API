const express = require("express");

const router = express.Router();

let courses = [];

router.post("/", (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name,
    duration: req.body.duration
  };

  courses.push(course);

  res.status(201).json(course);
});

router.get("/", (req, res) => {
  res.json(courses);
});

module.exports = router;
