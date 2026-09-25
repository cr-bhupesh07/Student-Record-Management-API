const express = require("express");

const app = express();

app.use(express.json());

const studentRoutes = require("../routes/students");
app.use("/students", studentRoutes);

const courseRoutes = require("../routes/courses");
app.use("/courses", courseRoutes);

const enrollmentRoutes = require("../routes/enrollments");
app.use("/enrollments", enrollmentRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Student Record API is running"
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
