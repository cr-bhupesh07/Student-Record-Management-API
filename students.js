const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const studentsFilePath = path.join(__dirname, "students.json");

const readStudents = () => {
  try {
    const content = fs.readFileSync(studentsFilePath, "utf8");
    const students = JSON.parse(content);
    return Array.isArray(students) ? students : [];
  } catch (error) {
    return [];
  }
};

const writeStudents = (students) => {
  fs.writeFileSync(studentsFilePath, JSON.stringify(students, null, 2));
};

router.post("/", (req, res) => {
  const { name, age, course } = req.body;

  if (!name || !age || !course) {
    return res.status(400).json({ message: "Name, age, and course are required" });
  }

  const students = readStudents();
  const student = {
    id: students.length ? Math.max(...students.map((s) => s.id)) + 1 : 1,
    name,
    age,
    course
  };

  students.push(student);
  writeStudents(students);

  res.status(201).json(student);
});

router.get("/", (req, res) => {
  const students = readStudents();
  res.json(students);
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, age, course } = req.body;
  const students = readStudents();
  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  student.name = name || student.name;
  student.age = age || student.age;
  student.course = course || student.course;

  writeStudents(students);
  res.json(student);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  let students = readStudents();

  const studentExists = students.some((student) => student.id === id);
  if (!studentExists) {
    return res.status(404).json({ message: "Student not found" });
  }

  students = students.filter((student) => student.id !== id);
  writeStudents(students);

  res.json({ message: "Student deleted successfully" });
});

module.exports = router;
