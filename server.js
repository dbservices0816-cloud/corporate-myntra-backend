const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const queryRoutes = require("./routes/queryRoutes");
const cors = require("cors");

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ CORS Configuration (PRODUCTION READY)
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://192.168.0.102:5173",
  "https://corporatemitraportal.com",
  "https://www.corporatemitraportal.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("API Working ✅");
});

// ✅ API Routes
app.use("/api", queryRoutes);

// ✅ Connect Database SAFELY
connectDB()
  .then(() => {
    console.log("✅ MongoDB Connected");

    // ✅ Start server only after DB connect
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection Failed:", err.message);
    process.exit(1);
  });