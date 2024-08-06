try {
  require("dotenv").config();
  console.log("TOKEN_SECRET:", process.env.TOKEN_SECRET);
} catch (error) {
  console.error("Error loading .env file or accessing TOKEN_SECRET:", error);
}

console.log("Reached after loading dotenv");

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5005;
const authRoutes = require("./routes/auth.routes");
const cohortRoutes = require("./routes/cohort.routes");
const studentRoutes = require("./routes/student.routes");
const userRoutes = require("./routes/user.routes");

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/cohort-tools-api",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// Initialize Express app
const app = express();

// Middleware
app.use(cors({ origin: ["http://localhost:5173", "http://example.com"] }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Routes
app.use("/auth", authRoutes);
app.use("/api/cohorts", cohortRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/users", userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
