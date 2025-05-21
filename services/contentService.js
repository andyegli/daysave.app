
const { content, userProfile, tag, comment, contact, contactSocialProfile, socialPlatforms } = require('../models');

module.exports = {
  // Create a new content post
  async createContent(userId, data) {
    return await content.create({
      ...data,
      userId,
    });
  },

  // Get all content with user info
  async getAllContent() {
    return await content.findAll({
      include: [{ model: userProfile, attributes: ['username'] }]
    });
  },

  // Get comments for a specific content
  async getComments(contentId) {
    return await comment.findAll({
      where: { contentId },
      include: [{ model: userProfile, attributes: ['username'] }]
    });
  },

  // Get content created by AI
  async getAIContent() {
    return await content.findAll({
      where: { creatorType: 'AI' }
    });
  },

  // Update a comment
  async updateComment(commentId, text) {
    return await comment.update({ text }, { where: { id: commentId } });
  },

  // Delete a content post by title
  async deleteContentByTitle(title) {
    return await content.destroy({ where: { title } });
  },

  // Get content with tags
  async getContentWithTags() {
    return await content.findAll({
      include: [{ model: tag, through: { attributes: [] } }]
    });
  },

  // Get content with comments
  async getContentWithComments(contentId) {
    return await content.findOne({
      where: { id: contentId },
      include: [{ model: comment }]
    });
  },

  // Join user → content → comment
  async getUserContentAndComments(userId) {
    return await userProfile.findOne({
      where: { id: userId },
      include: {
        model: content,
        include: [comment]
      }
    });
  },

  // Contact social media profiles
  async getContactSocialLinks() {
    return await contact.findAll({
      include: [{
        model: contactSocialProfile,
        include: [socialPlatforms]
      }]
    });
  }
};
