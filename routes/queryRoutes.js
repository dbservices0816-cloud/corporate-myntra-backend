const express = require("express");
const router = express.Router();

const {
  submitQuery,
  getAllQueries,
  getQueryById,
} = require("../controllers/queryController");

// ✅ POST (already tha)
router.post("/query", submitQuery);

// ✅ GET ALL
router.get("/query", getAllQueries);

// ✅ GET BY ID
router.get("/query/:id", getQueryById);

module.exports = router;