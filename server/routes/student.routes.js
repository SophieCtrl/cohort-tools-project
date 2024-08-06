const express = require("express");
const router = express.Router();
const Student = require("../models/Student.model");

router.post("/", (req, res) => {
  Student.create(req.body)
    .then((student) => res.status(201).json(student))
    .catch((err) =>
      res.status(500).json({ message: "Failed to create new Student." })
    );
});

router.get("/", (req, res) => {
  Student.find({})
    .populate("cohort")
    .then((students) => res.status(200).json(students))
    .catch((err) =>
      res.status(500).json({ message: "Failed to find Students." })
    );
});

router.get("/cohort/:cohortId", (req, res) => {
  Student.find({ cohort: req.params.cohortId })
    .then((students) => res.status(200).json(students))
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Failed to retrieve students from cohort." })
    );
});

router.get("/:studentId", (req, res) => {
  Student.findById(req.params.studentId)
    .populate("cohort")
    .then((student) => res.status(200).json(student))
    .catch((err) =>
      res.status(500).json({ message: "Failed to retrieve student by id" })
    );
});

router.put("/:studentId", (req, res) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
    .then((student) => res.status(204).json(student))
    .catch((err) =>
      res.status(500).json({ message: "Failed to update student" })
    );
});

router.delete("/:studentId", (req, res) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then(() => res.status(204).send())
    .catch((err) =>
      res.status(500).json({ message: "Failed to delete student" })
    );
});

module.exports = router;
