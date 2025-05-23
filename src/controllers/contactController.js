const db = require('../models');

const getAllContacts = async (req, res) => {
  try {
    const contacts = await db.Contacts.findAll({
      where: { user_profile_id: 1 }, // Placeholder: Replace with actual user ID from session/auth
    });
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).send('Server error');
  }
};

const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await db.Contacts.create({
      user_profile_id: 1, // Placeholder: Replace with actual user ID from session/auth
      name,
      email,
      phone,
    });
    res.status(201).json(newContact);
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getAllContacts,
  createContact,
};