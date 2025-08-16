// server.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');

// ✅ Import startPolling correctly
const { startPolling } = require("./services/fetcher");
const DataPoint = require('./models/DataPoint');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', // allow React frontend
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// REST endpoint to get recent data
app.get('/api/data', async (req, res) => {
  try {
    const recentData = await DataPoint.find().sort({ timestamp: -1 }).limit(50);
    res.json(recentData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// WebSocket connection
io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

// ✅ Start fetching and emitting
startPolling(io);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
