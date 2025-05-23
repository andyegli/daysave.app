const db = require('../models');

const getAllContent = async (req, res) => {
  try {
    const content = await db.Content.findAll({
      where: { userId: 1 }, // Placeholder: Replace with actual user ID from session/auth
    });
    res.status(200).json(content);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).send('Server error');
  }
};

const createContent = async (req, res) => {
  try {
    const { title, body } = req.body;
    const newContent = await db.Content.create({
      userId: 1, // Placeholder: Replace with actual user ID from session/auth
      title,
      body,
    });
    res.status(201).json(newContent);
  } catch (error) {
    console.error('Error creating content:', error);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getAllContent,
  createContent,
};