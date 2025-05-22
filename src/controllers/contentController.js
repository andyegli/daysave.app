const { Content, Comments, Tags, ContentTags, ContentShares, ContentSources } = require('../models');
const { Op } = require('sequelize');

/**
 * Content controller for daysave.app v1.0.1
 */
class ContentController {
  /**
   * Create new content
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async createContent(req, res) {
    const { title, url, summary, type, sourceName } = req.body;
    try {
      const source = await ContentSources.findOne({ where: { name: sourceName } });
      const content = await Content.create({
        user_profile_id: req.user.id,
        title,
        url,
        summary,
        type,
        source_id: source ? source.id : null,
      });
      // Placeholder for AI analysis hook
      // await axios.post('/api/ai/analyze', { contentId: content.id });
      res.status(201).json(content);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  /**
   * Retrieve content with filtering
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async getContent(req, res) {
    const { tag, search, startDate, endDate, type, source } = req.query;
    const where = { user_profile_id: req.user.id };

    if (tag) {
      where['$ContentTags.tag_id$'] = {
        [Op.in]: (await Tags.findAll({ where: { name: tag } })).map(t => t.id),
      };
    }
    if (search) where.title = { [Op.like]: `%${search}%` };
    if (startDate || endDate) {
      where.created_at = {
        [Op.between]: [startDate || '1970-01-01', endDate || new Date()],
      };
    }
    if (type) where.type = type;
    if (source) where['$ContentSource.name$'] = source;

    const contents = await Content.findAll({
      where,
      include: [
        { model: ContentSources, as: 'ContentSource' },
        { model: Tags, through: { attributes: [] } },
        { model: Comments },
      ],
    });

    res.render('dashboard', {
      contents,
      colors: {
        youtube: '#FFD05D',
        facebook: '#20D6D1',
        instagram: '#16C3C6',
        upload: '#008AA0',
        weblink: '#16C3C6',
      },
    });
  }

  /**
   * Update existing content
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async updateContent(req, res) {
    const { id } = req.params;
    const { title, summary } = req.body;
    try {
      const content = await Content.findOne({
        where: { id, user_profile_id: req.user.id },
      });
      if (!content) return res.status(404).send('Content not found');
      await content.update({ title, summary });
      res.send('Content updated');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  /**
   * Soft delete content
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async deleteContent(req, res) {
    const { id } = req.params;
    try {
      const content = await Content.findOne({
        where: { id, user_profile_id: req.user.id },
      });
      if (!content) return res.status(404).send('Content not found');
      await content.destroy();
      res.send('Content deleted');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  /**
   * Perform batch actions on content
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async batchAction(req, res) {
    const { ids, action, contacts } = req.body;
    try {
      const contents = await Content.findAll({
        where: { id: ids, user_profile_id: req.user.id },
      });
      if (contents.length !== ids.length) {
        return res.status(404).send('Some content not found');
      }
      if (action === 'delete') {
        await Content.destroy({ where: { id: ids } });
      }
      if (action === 'edit') {
        await Content.update({ title: req.body.title }, { where: { id: ids } });
      }
      if (action === 'archive') {
        await Content.update({ archived: true }, { where: { id: ids } });
      }
      if (action === 'share') {
        await ContentShares.bulkCreate(
          ids.map(id => ({ content_id: id, contact_id: contacts }))
        );
      }
      res.send('Batch action completed');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  /**
   * Add a comment to content
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async addComment(req, res) {
    const { id } = req.params;
    const { comment } = req.body;
    try {
      const content = await Content.findOne({
        where: { id, user_profile_id: req.user.id },
      });
      if (!content) return res.status(404).send('Content not found');
      await Comments.create({ content_id: id, commenter_id: req.user.id, comment });
      res.send('Comment added');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  /**
   * Add a tag to content
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async addTag(req, res) {
    const { id } = req.params;
    const { tagName } = req.body;
    try {
      const content = await Content.findOne({
        where: { id, user_profile_id: req.user.id },
      });
      if (!content) return res.status(404).send('Content not found');
      const [tag] = await Tags.findOrCreate({ where: { name: tagName } });
      await ContentTags.create({ content_id: id, tag_id: tag.id });
      res.send('Tag added');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

module.exports = ContentController;