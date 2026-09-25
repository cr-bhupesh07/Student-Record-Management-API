const express = require("express");

const router = express.Router();

let enrollments = [];

router.post("/", (req, res) => {
  const enrollment = {
    id: enrollments.length + 1,
    studentId: req.body.studentId,
    courseId: req.body.courseId
  };

  enrollments.push(enrollment);

  res.status(201).json(enrollment);
});

router.get("/", (req, res) => {
  res.json(enrollments);
});

module.exports = router;
