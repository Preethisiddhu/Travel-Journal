import Journal from '../models/Journal.js';

export const createJournal = async (req, res) => {
  const { title, description, image } = req.body;
  const userId = req.userId; // You should extract this from auth middleware

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const journal = new Journal({ userId, title, description, image });
    await journal.save();
    res.status(201).json(journal);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getJournals = async (req, res) => {
  const userId = req.userId; // Extract from auth middleware

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const journals = await Journal.find({ userId });
    res.json(journals);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
