const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const queryRoutes = require("./routes/queryRoutes");
const cors = require("cors");

dotenv.config();

const app = express();

// ✅ Connect Database
connectDB();

// ✅ CORS Configuration
const corsOptions = {
  origin: [
    "http://localhost:5173",        // Vite local
    "http://127.0.0.1:5173",       
    "http://192.168.0.102:5173"     // network/mobile
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};

app.use(cors(corsOptions));

// ✅ Middleware
app.use(express.json());

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("API Working ✅");
});

// ✅ API Routes
app.use("/api", queryRoutes);

// ✅ Server Start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});