// routes/storyRoutes.js
import express from 'express';
import multer from 'multer';
import { verifyToken } from '../middleware/authMiddleware.js';
import Story from '../models/Story.js';

const router = express.Router();

// Use memory storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.buffer : null;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const newStory = new Story({
      title,
      description,
      image,
      user: req.user.id,
    });

    await newStory.save();

    res.status(201).json({ message: 'Story created', story: newStory });
  } catch (err) {
    console.error('Error creating story:', err);
    res.status(500).json({ message: 'Server error while creating story' });
  }
});

export default router;
// In routes/storyRoutes.js or wherever you defined the route
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.buffer : null;

    const newStory = new Story({
      title,
      description,
      image,
      user: req.user.id,
    });

    await newStory.save();
    res.status(201).json({ message: 'Story created', story: newStory });
  } catch (error) {
    console.error('🚨 Error creating story:', error.stack);  // LOG THIS
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
