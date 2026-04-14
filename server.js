const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const queryRoutes = require("./routes/queryRoutes");
const cors = require("cors");

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
  "http://192.168.0.103:5173",
  "https://corporatemitraportal.com",
  "https://www.corporatemitraportal.com"
];

const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};

// ✅ CORS pehle — express.json() se bhi pehle
app.use(cors(corsOptions));
app.options("/{*path}", cors(corsOptions)); // ✅ POST preflight fix (Express v5)
app.use(express.json());

app.get("/", (req, res) => res.send("API Working ✅"));
app.use("/api", queryRoutes);

connectDB()
  .then(() => {
    console.log("✅ MongoDB Connected");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ DB Connection Failed:", err.message);
    process.exit(1);
  });