const mongoose = require('mongoose');

const DataPointSchema = new mongoose.Schema({
  source: String,               // e.g. "coinGecko"
  key: String,                  // e.g. "bitcoin"
  timestamp: { type: Date, required: true },
  value: { type: Number, required: true },  // numeric price/value
  raw: mongoose.Schema.Types.Mixed             // store full raw API response if needed
});

module.exports = mongoose.model('DataPoint', DataPointSchema);
