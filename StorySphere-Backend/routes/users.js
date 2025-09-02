import express from 'express';
import { signin, signup } from '../controllers/users.js';  // Import signin/signup controllers

const router = express.Router();

// GET request to check user endpoint
router.get('/', async (req, res) => {
  try {
    // If needed, fetch all users (ensure it's protected if necessary)
    // const users = await User.find();
    res.send("The Users are Confidential");  // Placeholder, you can customize it for real user list access
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST request for signing in
router.post('/signin', signin);  // Calls signin controller

// POST request for signing up
router.post('/signup', signup);  // Calls signup controller

export default router;
