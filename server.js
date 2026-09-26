const express = require("express");
const cors = require("cors");

const studentRoutes = require("./students");
const courseRoutes = require("./courses");
const enrollmentRoutes = require("./enrollments");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);
app.use("/enrollments", enrollmentRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Student Record API is running",
    status: "ok"
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
