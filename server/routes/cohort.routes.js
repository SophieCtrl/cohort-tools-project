const express = require("express");
const router = express.Router();
const Cohort = require("../models/Cohort.model");

router.post("/", (req, res) => {
  Cohort.create(req.body)
    .then((cohort) => res.status(201).json(cohort))
    .catch((err) =>
      res.status(500).json({ message: "Failed to create cohort" })
    );
});

router.get("/", (req, res) => {
  Cohort.find({})
    .then((cohorts) => res.status(200).json(cohorts))
    .catch((err) =>
      res.status(500).json({ message: "Failed to find cohorts" })
    );
});

router.get("/:cohortId", (req, res) => {
  Cohort.findById(req.params.cohortId)
    .then((cohort) => res.status(200).json(cohort))
    .catch((err) =>
      res.status(500).json({ message: "Failed to find cohort by id" })
    );
});

router.put("/:cohortId", (req, res) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
    .then((cohort) => res.status(204).json(cohort))
    .catch((err) =>
      res.status(500).json({ message: "Failed to update cohort" })
    );
});

router.delete("/:cohortId", (req, res) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
    .then(() => res.status(204).send())
    .catch((err) =>
      res.status(500).json({ message: "Failed to delete cohort" })
    );
});

module.exports = router;
