const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

/**
 * Seed script for daysave.app v1.0.1
 */
module.exports = {
  up: async (queryInterface) => {
    // Roles
    await queryInterface.bulkInsert('roles', [
      { id: uuidv4(), name: 'guest' },
      { id: uuidv4(), name: 'trial_member' },
      { id: uuidv4(), name: 'super_admin' },
    ]);

    // Permissions
    await queryInterface.bulkInsert('permissions', [
      { id: uuidv4(), name: 'access_admin_page', description: 'Access admin dashboard' },
      { id: uuidv4(), name: 'create_own_content', description: 'Create own content' },
      { id: uuidv4(), name: 'edit_own_content', description: 'Edit own content' },
      { id: uuidv4(), name: 'share_content', description: 'Share content with contacts' },
      { id: uuidv4(), name: 'create_contacts', description: 'Create and manage contacts' },
    ]);

    // Role Permissions (assign all permissions to super_admin)
    const superAdminRole = await queryInterface.rawSelect('roles', { where: { name: 'super_admin' } }, ['id']);
    const permissions = await queryInterface.rawSelect('permissions', { where: {} }, ['id']);
    const rolePermissions = permissions.map(permission => ({
      id: uuidv4(),
      role_id: superAdminRole,
      permission_id: permission,
    }));
    await queryInterface.bulkInsert('role_permissions', rolePermissions);

    // Social Providers
    await queryInterface.bulkInsert('social_providers', [
      { id: uuidv4(), name: 'WhatsApp' },
      { id: uuidv4(), name: 'WhatsAppBusiness' },
      { id: uuidv4(), name: 'Teams' },
      { id: uuidv4(), name: 'Zoom' },
      { id: uuidv4(), name: 'Threema' },
      { id: uuidv4(), name: 'LinkedIn' },
      { id: uuidv4(), name: 'Messenger' },
      { id: uuidv4(), name: 'Telegram' },
      { id: uuidv4(), name: 'Discord' },
      { id: uuidv4(), name: 'Snapchat' },
      { id: uuidv4(), name: 'Facebook' },
      { id: uuidv4(), name: 'Threads' },
      { id: uuidv4(), name: 'Slack' },
      { id: uuidv4(), name: 'GitHub' },
      { id: uuidv4(), name: 'Signal' },
      { id: uuidv4(), name: 'Gmail' },
      { id: uuidv4(), name: 'Simple' },
      { id: uuidv4(), name: 'Instagram' },
      { id: uuidv4(), name: 'TikTok' },
      { id: uuidv4(), name: 'Revolut' },
    ]);

    // Payment Providers
    await queryInterface.bulkInsert('payment_providers', [
      { id: uuidv4(), name: 'PayPal' },
      { id: uuidv4(), name: 'Stripe' },
      { id: uuidv4(), name: 'ApplePay' },
      { id: uuidv4(), name: 'GooglePay' },
    ]);

    // Content Sources
    await queryInterface.bulkInsert('content_sources', [
      { id: uuidv4(), name: 'youtube' },
      { id: uuidv4(), name: 'facebook' },
      { id: uuidv4(), name: 'instagram' },
      { id: uuidv4(), name: 'upload' },
      { id: uuidv4(), name: 'weblink' },
      { id: uuidv4(), name: 'whatsapp' },
      { id: uuidv4(), name: 'linkedin' },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('statistics', null, {});
    await queryInterface.bulkDelete('audit_logs', null, {});
    await queryInterface.bulkDelete('payment_transactions', null, {});
    await queryInterface.bulkDelete('payment_providers', null, {});
    await queryInterface.bulkDelete('subscription_grace_periods', null, {});
    await queryInterface.bulkDelete('subscriptions', null, {});
    await queryInterface.bulkDelete('comments', null, {});
    await queryInterface.bulkDelete('content_tags', null, {});
    await queryInterface.bulkDelete('tags', null, {});
    await queryInterface.bulkDelete('content_shares', null, {});
    await queryInterface.bulkDelete('content_analysis', null, {});
    await queryInterface.bulkDelete('content', null, {});
    await queryInterface.bulkDelete('contact_group_members', null, {});
    await queryInterface.bulkDelete('contact_groups', null, {});
    await queryInterface.bulkDelete('contacts', null, {});
    await queryInterface.bulkDelete('fingerprints', null, {});
    await queryInterface.bulkDelete('social_profiles', null, {});
    await queryInterface.bulkDelete('social_providers', null, {});
    await queryInterface.bulkDelete('user_roles', null, {});
    await queryInterface.bulkDelete('role_permissions', null, {});
    await queryInterface.bulkDelete('permissions', null, {});
    await queryInterface.bulkDelete('roles', null, {});
    await queryInterface.bulkDelete('mfa_methods', null, {});
    await queryInterface.bulkDelete('auth_providers', null, {});
    await queryInterface.bulkDelete('user_profiles', null, {});
  },
};