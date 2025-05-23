import express from 'express';
import multer from 'multer';
import { verifyToken } from '../middleware/authMiddleware.js';
import Story from '../models/Story.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a new story (requires auth, image optional)
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

    res.status(201).json({ message: 'Story created successfully', story: newStory });
  } catch (error) {
    console.error('Error creating story:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all stories of the logged-in user
router.get('/', verifyToken, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id });
    res.json(stories);
  } catch (error) {
    console.error('Error fetching stories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a story by ID if owned by the logged-in user
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const storyId = req.params.id;

    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    if (story.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this story' });
    }

    await story.deleteOne();

    res.json({ message: 'Story deleted successfully' });
  } catch (error) {
    console.error('Error deleting story:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
