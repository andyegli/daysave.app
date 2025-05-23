import { v4 as uuidv4 } from 'uuid';

export const getContacts = async (req, res) => {
  try {
    const db = (await import('../models/index.js')).default;
    const contacts = await db.Contacts.findAll();
    res.render('contact/index', { contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).send('Server error');
  }
};

export const getContactById = async (req, res) => {
  try {
    const db = (await import('../models/index.js')).default;
    const contact = await db.Contacts.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).send('Contact not found');
    }
    res.render('contact/show', { contact });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).send('Server error');
  }
};

export const getCreateContact = (req, res) => {
  res.render('contact/create');
};

export const postContact = async (req, res) => {
  try {
    const db = (await import('../models/index.js')).default;
    const { name, email, phone } = req.body;
    const user_profile_id = req.session.userId; // Get userId from session

    if (!user_profile_id) {
      console.error('No user authenticated for contact creation');
      return res.status(401).send('You must be logged in to create a contact');
    }

    const contact = await db.Contacts.create({
      id: uuidv4(),
      user_profile_id,
      name,
      email,
      phone
    });

    console.log('Contact created:', contact.dataValues);
    res.redirect('/contact');
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).send('Server error');
  }
};

export const getEditContact = async (req, res) => {
  try {
    const db = (await import('../models/index.js')).default;
    const contact = await db.Contacts.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).send('Contact not found');
    }
    res.render('contact/edit', { contact });
  } catch (error) {
    console.error('Error fetching contact for edit:', error);
    res.status(500).send('Server error');
  }
};

export const postEditContact = async (req, res) => {
  try {
    const db = (await import('../models/index.js')).default;
    const { name, email, phone } = req.body;
    const contact = await db.Contacts.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).send('Contact not found');
    }
    await contact.update({ name, email, phone });
    res.redirect('/contact');
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).send('Server error');
  }
};

export const deleteContact = async (req, res) => {
  try {
    const db = (await import('../models/index.js')).default;
    const contact = await db.Contacts.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).send('Contact not found');
    }
    await contact.destroy();
    res.redirect('/contact');
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).send('Server error');
  }
};