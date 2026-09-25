const express = require("express");

const router = express.Router();

let students = [];

router.post("/", (req, res) => {
  const student = {
    id: students.length + 1,
    name: req.body.name,
    age: req.body.age,
    course: req.body.course
  };

  students.push(student);

  res.status(201).json(student);
});

router.get("/", (req, res) => {
  res.json(students);
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  student.name = req.body.name;
  student.age = req.body.age;
  student.course = req.body.course;

  res.json(student);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  students = students.filter((student) => student.id !== id);

  res.json({
    message: "Student deleted successfully"
  });
});

module.exports = router;
