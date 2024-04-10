// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB database
mongoose.connect('mongodb+srv://ravinder22:ravinder123@ravindernyalakati08.ovdjwp3.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

// Define Diary Entry schema
const diaryEntrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  location: { type: String, required: true },
  photos: [String],
});
const DiaryEntry = mongoose.model('DiaryEntry', diaryEntrySchema);

// Middleware function for authentication
// Middleware function for authentication
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    console.log('No token provided');
    return res.sendStatus(401);
  }

  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.sendStatus(403);
    }
    console.log('Decoded user:', decoded);
    req.user = decoded;
    next();
  });
}

// Routes for user registration, login, profile management
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  await user.save();
  res.json({ message: 'User registered successfully', user });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) return res.status(401).json({ message: 'Invalid username or password' });
  const token = jwt.sign({ username: user.username }, 'secret_key', { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
});

app.get('/profile', authenticateToken, async (req, res) => {
  const user = await User.findOne({ username: req.user.username });
  res.json(user);
});

// Routes for CRUD operations on diary entries
app.post('/diary', authenticateToken, async (req, res) => {
  const { title, description, location, photos } = req.body;
  const entry = new DiaryEntry({ title, description, location, photos });
  await entry.save();
  res.json({ message: 'Diary entry created successfully', entry });
});

app.get('/diary', authenticateToken, async (req, res) => {
  const entries = await DiaryEntry.find();
  res.json(entries);
});

app.get('/diary/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const entry = await DiaryEntry.findById(id);
  if (!entry) return res.status(404).json({ message: 'Entry not found' });
  res.json(entry);
});

app.put('/diary/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  const updatedEntry = await DiaryEntry.findByIdAndUpdate(id, newData, { new: true });
  res.json({ message: 'Diary entry updated successfully', updatedEntry });
});

app.delete('/diary/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  await DiaryEntry.findByIdAndDelete(id);
  res.json({ message: 'Entry deleted successfully' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
