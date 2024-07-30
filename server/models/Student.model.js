const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Cohort = "./Cohort.model.js";

const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  linkedinUrl: String,
  languages: {
    type: [String],
    enum: ["English", "German", "Spanish", "Italian", "French"],
  },
  program: String,
  background: String,
  image: String,
  projects: { type: [String] },
  cohort: {
    type: Schema.Types.ObjectId,
    ref: "Cohort", // Reference to the Cohort model
  },
});

const Student = mongoose.model("Student", studentSchema);
