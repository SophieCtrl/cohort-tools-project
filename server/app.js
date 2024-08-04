const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 5005;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/cohort-tools-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// Import Mongoose Models
const Student = require("./models/Student.model");
const Cohort = require("./models/Cohort.model");

// STATIC DATA
// const cohorts = require("./cohorts.json");
// const students = require("./students.json");

// INITIALIZE EXPRESS APP
const app = express();

// MIDDLEWARE
app.use(cors({ origin: ["http://localhost:5173", "http://example.com"] }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES
// app.get("/docs", (req, res) => {
//   res.sendFile(__dirname + "/views/docs.html");
// });

// app.get("/api/cohorts", (req, res) => {
//   res.json(cohorts);
// });

// app.get("/api/students", (req, res) => {
//   res.json(students);
// });

app.post("/api/students", (req, res) => {
  Student.create(req.body)
    .then((student) => res.status(201).json(student))
    .catch((err) =>
      res.status(500).json({ message: "Failed to create new Student." })
    );
});

app.get("/api/students", (req, res) => {
  Student.find({})
    .populate("cohort")
    .then((students) => res.status(200).json(students))
    .catch((err) =>
      res.status(500).json({ message: "Failed to find Students." })
    );
});

app.get("/api/students/cohort/:cohortId", (req, res) => {
  Student.find({ cohort: req.params.cohortId })
    .then((students) => res.status(200).json(students))
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Failed to retrieve students from cohort." })
    );
});

app.get("/api/students/:studentId", (req, res) => {
  Student.findById(req.params.studentId)
    .populate("cohort")
    .then((student) => res.status(200).json(student))
    .catch((err) =>
      res.status(500).json({ message: "Failed to retrieve student by id" })
    );
});

app.put("/api/students/:studentId", (req, res) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
    .then((student) => res.status(204).json(student))
    .catch((err) =>
      res.status(500).json({ message: "Failed to update student" })
    );
});

app.delete("/api/students/:studentId", (req, res) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then(() => res.status(204).send())
    .catch((err) =>
      res.status(500).json({ message: "Failed to delete student" })
    );
});

app.post("/api/cohorts", (req, res) => {
  Cohort.create(req.body)
    .then((cohort) => res.status(201).json(cohort))
    .catch((err) =>
      res.status(500).json({ message: "Failed to create cohort" })
    );
});

app.get("/api/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohorts) => res.status(200).json(cohorts))
    .catch((err) =>
      res.status(500).json({ message: "Failed to find cohorts" })
    );
});

app.get("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findById(req.params.cohortId)
    .then((cohort) => res.status(200).json(cohort))
    .catch((err) =>
      res.status(500).json({ message: "Failed to find cohort by id" })
    );
});

app.put("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
    .then((cohort) => res.status(204).json(cohort))
    .catch((err) =>
      res.status(500).json({ message: "Failed to update cohort" })
    );
});

app.delete("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
    .then(() => res.status(204).send())
    .catch((err) =>
      res.status(500).json({ message: "Failed to delete cohort" })
    );
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
