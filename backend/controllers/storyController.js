import Story from '../models/Story.js';

export const getStories = async (req, res) => {
  const stories = await Story.find({ user: req.user.id });
  res.json(stories);
};

export const addStory = async (req, res) => {
  const { title, description } = req.body;
  const story = new Story({
    title,
    description,
    image: req.file.filename,
    user: req.user.id,
  });
  await story.save();
  res.json(story);
};
