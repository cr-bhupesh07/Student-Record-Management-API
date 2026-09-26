const express = require("express");

const router = express.Router();

let enrollments = [];

router.post("/", (req, res) => {
  const { studentId, courseId } = req.body;

  if (!studentId || !courseId) {
    return res.status(400).json({ message: "studentId and courseId are required" });
  }

  const enrollment = {
    id: enrollments.length ? Math.max(...enrollments.map((entry) => entry.id)) + 1 : 1,
    studentId,
    courseId
  };

  enrollments.push(enrollment);
  res.status(201).json(enrollment);
});

router.get("/", (req, res) => {
  res.json(enrollments);
});

module.exports = router;
