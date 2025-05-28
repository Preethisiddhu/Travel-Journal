import express from 'express';
import multer from 'multer';
import { verifyToken } from '../middleware/authMiddleware.js';
import Journal from '../models/Journal.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newJournal = new Journal({
      userId: req.user.id,
      title,
      description,
      imageUrl,
    });

    await newJournal.save();
    res.status(201).json(newJournal);
  } catch (err) {
    console.error('POST /api/journals error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
    const journals = await Journal.find({ userId: req.user.id });
    res.json(journals);
  } catch (err) {
    console.error('GET /api/journals error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
