const express = require('express');
const DataPoint = require('../models/DataPoint');
const router = express.Router();

router.get('/data', async (req, res) => {
  try {
    const rawData = await DataPoint.find()
      .sort({ timestamp: 1 })   // oldest first; use -1 for newest first
      .limit(100);

    // Map to frontend-friendly format
    const data = rawData.map(d => ({
      time: d.timestamp instanceof Date
        ? d.timestamp.toISOString()
        : new Date(d.timestamp).toISOString(),
      price: d.value,
    }));

    res.json(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get('/test', (req, res) => {
  res.json({ message: "API working" });
});

module.exports = router;
