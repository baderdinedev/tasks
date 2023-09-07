const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
    try {
      const { title, description } = req.body;
      const task = new Task({ title, description });
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// Controller function to get all tasks
exports.getAllTasks = async (req, res) => {
    try {
      // Fetch all tasks from the database
      const tasks = await Task.find();
  
      // Return the tasks as JSON response
      res.json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};
// Controller function to delete tasks
exports.deleteTask = async (req, res) => {
    try {
      const taskId = req.params.id;
  
      // Use Mongoose to find and remove the task by ID
      const deletedTask = await Task.findByIdAndDelete(taskId);
  
      if (!deletedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };