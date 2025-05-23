import db from '../models/index.js';

export default {
  async getAllContent(req, res) {
    try {
      const contents = await db.Content.findAll();
      res.render('content/index', { contents });
    } catch (error) {
      console.error('Error fetching content:', error);
      res.status(500).send('Server error');
    }
  },

  createContent(req, res) {
    res.render('content/create');
  },

  async postContent(req, res) {
    try {
      const { title, body } = req.body;
      await db.Content.create({ title, body });
      res.redirect('/content');
    } catch (error) {
      console.error('Error creating content:', error);
      res.status(500).send('Server error');
    }
  },

  async getContent(req, res) {
    try {
      const content = await db.Content.findByPk(req.params.id);
      if (!content) {
        return res.status(404).send('Content not found');
      }
      res.render('content/show', { content });
    } catch (error) {
      console.error('Error fetching content:', error);
      res.status(500).send('Server error');
    }
  },

  async editContent(req, res) {
    try {
      const content = await db.Content.findByPk(req.params.id);
      if (!content) {
        return res.status(404).send('Content not found');
      }
      res.render('content/edit', { content });
    } catch (error) {
      console.error('Error fetching content for edit:', error);
      res.status(500).send('Server error');
    }
  },

  async updateContent(req, res) {
    try {
      const { title, body } = req.body;
      const content = await db.Content.findByPk(req.params.id);
      if (!content) {
        return res.status(404).send('Content not found');
      }
      await content.update({ title, body });
      res.redirect(`/content/${req.params.id}`);
    } catch (error) {
      console.error('Error updating content:', error);
      res.status(500).send('Server error');
    }
  },

  async deleteContent(req, res) {
    try {
      const content = await db.Content.findByPk(req.params.id);
      if (!content) {
        return res.status(404).send('Content not found');
      }
      await content.destroy();
      res.redirect('/content');
    } catch (error) {
      console.error('Error deleting content:', error);
      res.status(500).send('Server error');
    }
  },
};