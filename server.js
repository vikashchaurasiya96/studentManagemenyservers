require("dotenv").config();

const connectDB = require("./config/db");

const express = require("express");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const marksRoutes = require("./routes/marksRoutes");
const resultRoutes = require("./routes/resultRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const feeRoutes = require("./routes/feeRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 5000;

// ======================
// Database Connection
// ======================
connectDB();

// ======================
// Middlewares
// ======================
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

// ======================
// API Routes
// ======================
app.use("/api/auth", authRoutes);

app.use("/api/students", studentRoutes);

app.use("/api/attendance", attendanceRoutes);

app.use("/api/marks", marksRoutes);

app.use("/api/result", resultRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/fees", feeRoutes);

app.use("/api/teachers", teacherRoutes);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ======================
// Test Route
// ======================
app.get("/", (req, res) => {
  res.send("🚀 EduSphere Backend Running...");
});

// ======================
// Server Start
// ======================
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});