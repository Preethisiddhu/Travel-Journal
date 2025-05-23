import express from 'express';
import multer from 'multer';
import { verifyToken } from '../middleware/authMiddleware.js';
import Story from '../models/Story.js';

const router = express.Router();

// Multer setup to store images in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/stories - create story for logged-in user
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
      userId: req.user.id,
    });

    await newStory.save();
    res.status(201).json({ message: 'Story created successfully', story: newStory });
  } catch (error) {
    console.error('Error creating story:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/stories - get stories only of logged-in user
router.get('/', verifyToken, async (req, res) => {
  try {
    const stories = await Story.find({ userId: req.user.id });
    res.json(stories);
  } catch (error) {
    console.error('Error fetching stories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/stories/:id - delete story if owned by user
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    if (story.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await Story.findByIdAndDelete(req.params.id);
    res.json({ message: 'Story deleted successfully' });
  } catch (error) {
    console.error('Error deleting story:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
