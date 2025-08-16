const axios = require('axios');
const DataPoint = require('../models/DataPoint');

const COIN_ID = process.env.COIN_ID || 'bitcoin';
const VS_CURRENCY = process.env.VS_CURRENCY || 'usd';
const POLL_INTERVAL_MS = parseInt(process.env.POLL_INTERVAL_MS) || 30000;

async function fetchAndSave(io) {
  try {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price`,
      { params: { ids: COIN_ID, vs_currencies: VS_CURRENCY } }
    );

    const price = res.data[COIN_ID][VS_CURRENCY];
    const timestamp = new Date();

    // Save to MongoDB
    const dataPoint = new DataPoint({
      source: 'coinGecko',
      key: COIN_ID,
      timestamp,
      value: price,
      raw: res.data,
    });
    await dataPoint.save();

    // Emit update via WebSocket
    io.emit('priceUpdate', { time: timestamp.toISOString(), price });

    console.log(`Saved new price data: ${price} at ${timestamp.toISOString()}`);
  } catch (error) {
    console.error('Error fetching or saving data:', error.message);
  }
}

function startPolling(io) {
  fetchAndSave(io); // initial fetch immediately
  setInterval(() => fetchAndSave(io), POLL_INTERVAL_MS);
}

module.exports = { startPolling };
