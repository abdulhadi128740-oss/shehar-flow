const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/hotspots', require('./routes/hotspot.routes'));
app.use('/api/alerts', require('./routes/alert.routes'));
app.use('/api/contact', require('./routes/contact.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/activities', require('./routes/activity.routes'));

app.get('/', (req, res) => {
  res.send('Shehar Flow API is running...');
});

// HTTP + Socket.io
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

app.set('io', io);

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});