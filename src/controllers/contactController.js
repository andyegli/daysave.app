export default {
  async getAllContacts(req, res) {
    try {
      const db = (await import('../models/index.js')).default;
      const contacts = await db.Contacts.findAll();
      res.render('contact/index', { contacts });
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).send('Server error');
    }
  },

  createContact(req, res) {
    res.render('contact/create');
  },

  async postContact(req, res) {
    try {
      const db = (await import('../models/index.js')).default;
      const { name, email, phone } = req.body;
      await db.Contacts.create({ name, email, phone });
      res.redirect('/contact');
    } catch (error) {
      console.error('Error creating contact:', error);
      res.status(500).send('Server error');
    }
  },

  async getContact(req, res) {
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
  },

  async editContact(req, res) {
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
  },

  async updateContact(req, res) {
    try {
      const db = (await import('../models/index.js')).default;
      const { name, email, phone } = req.body;
      const contact = await db.Contacts.findByPk(req.params.id);
      if (!contact) {
        return res.status(404).send('Contact not found');
      }
      await contact.update({ name, email, phone });
      res.redirect(`/contact/${req.params.id}`);
    } catch (error) {
      console.error('Error updating contact:', error);
      res.status(500).send('Server error');
    }
  },

  async deleteContact(req, res) {
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
  },
};