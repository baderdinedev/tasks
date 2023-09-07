const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
// Import the controller functions
const tasksController = require('./controllers/tasksController');
const authRoutes = require('./routes/auth'); // Import user routes



// Connect to MongoDB (replace 'your-database-connection-string' with your actual MongoDB connection string)
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware setup
app.use(express.json()); // Parse JSON requests

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Routes
app.post('/api/tasks', tasksController.createTask);
app.get('/api/tasks', tasksController.getAllTasks);
app.delete('/api/tasks/:id', tasksController.deleteTask);

app.use('/api/auth', authRoutes); 

// Your API routes will go here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
