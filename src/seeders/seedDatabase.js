import { v4 as uuidv4 } from 'uuid';

/**
 * Seed script to populate the database with sample data for daysave.app
 */
export default async (db) => {
  // Seed UserProfiles
  const users = [
    { userId: uuidv4(), username: 'john_doe', email: 'john@example.com', createdAt: new Date(), updatedAt: new Date() },
    { userId: uuidv4(), username: 'jane_smith', email: 'jane@example.com', createdAt: new Date(), updatedAt: new Date() },
  ];
  await db.UserProfiles.bulkCreate(users);
  console.log('Seeded UserProfiles:', users);

  // Seed ContentSources
  const contentSources = [
    { id: uuidv4(), name: 'youtube' },
    { id: uuidv4(), name: 'facebook' },
  ];
  await db.ContentSources.bulkCreate(contentSources);
  console.log('Seeded ContentSources:', contentSources);

  // Seed Content
  const content = [
    { id: uuidv4(), userId: users[0].userId, title: 'My First Post', body: 'This is a sample post.', source_id: contentSources[0].id, createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), userId: users[1].userId, title: 'Another Post', body: 'This is another sample post.', source_id: contentSources[1].id, createdAt: new Date(), updatedAt: new Date() },
  ];
  await db.Content.bulkCreate(content);
  console.log('Seeded Content:', content);

  // Seed Comments
  const comments = [
    { id: uuidv4(), content_id: content[0].id, commenter_id: users[1].userId, comment: 'Great post!', created_at: new Date(), createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), content_id: content[1].id, commenter_id: users[0].userId, comment: 'Nice one!', created_at: new Date(), createdAt: new Date(), updatedAt: new Date() },
  ];
  await db.Comments.bulkCreate(comments);
  console.log('Seeded Comments:', comments);

  // Seed AuthProviders
  const authProviders = [
    { id: uuidv4(), user_profile_id: users[0].userId, provider: 'google', provider_user_id: 'google123', hashed_password: null, passkey_data: null },
    { id: uuidv4(), user_profile_id: users[1].userId, provider: 'local', provider_user_id: null, hashed_password: 'hashed_password', passkey_data: null },
  ];
  await db.AuthProviders.bulkCreate(authProviders);
  console.log('Seeded AuthProviders:', authProviders);

  // Seed ContactGroups
  const contactGroups = [
    { id: uuidv4(), user_profile_id: users[0].userId, name: 'Friends', createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), user_profile_id: users[1].userId, name: 'Family', createdAt: new Date(), updatedAt: new Date() },
  ];
  await db.ContactGroups.bulkCreate(contactGroups);
  console.log('Seeded ContactGroups:', contactGroups);

  // Seed Contacts
  const contacts = [
    { id: uuidv4(), user_profile_id: users[0].userId, group_id: contactGroups[0].id, name: 'Alice', email: 'alice@example.com', phone: '123-456-7890', createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), user_profile_id: users[1].userId, group_id: contactGroups[1].id, name: 'Bob', email: 'bob@example.com', phone: '098-765-4321', createdAt: new Date(), updatedAt: new Date() },
  ];
  await db.Contacts.bulkCreate(contacts);
  console.log('Seeded Contacts:', contacts);

  // Seed ContactGroupMembers
  const contactGroupMembers = [
    { id: uuidv4(), group_id: contactGroups[0].id, contact_id: contacts[0].id, createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), group_id: contactGroups[1].id, contact_id: contacts[1].id, createdAt: new Date(), updatedAt: new Date() },
  ];
  await db.ContactGroupMembers.bulkCreate(contactGroupMembers);
  console.log('Seeded ContactGroupMembers:', contactGroupMembers);

  // Seed ContentShares
  const contentShares = [
    { id: uuidv4(), content_id: content[0].id, user_profile_id: users[1].userId, shared_at: new Date(), createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), content_id: content[1].id, user_profile_id: users[0].userId, shared_at: new Date(), createdAt: new Date(), updatedAt: new Date() },
  ];
  await db.ContentShares.bulkCreate(contentShares);
  console.log('Seeded ContentShares:', contentShares);

  // Seed Fingerprints
  const fingerprints = [
    { id: uuidv4(), user_profile_id: users[0].userId, fingerprint_data: { device: 'desktop' }, createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), user_profile_id: users[1].userId, fingerprint_data: { device: 'mobile' }, createdAt: new Date(), updatedAt: new Date() },
  ];
  await db.Fingerprints.bulkCreate(fingerprints);
  console.log('Seeded Fingerprints:', fingerprints);

  // Seed MfaMethods
  const mfaMethods = [
    { id: uuidv4(), user_profile_id: users[0].userId, method_type: 'totp', secret: 'secret123', is_active: true, createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), user_profile_id: users[1].userId, method_type: 'sms', secret: null, is_active: true, createdAt: new Date(), updatedAt: new Date() },
  ];
  await db.MfaMethods.bulkCreate(mfaMethods);
  console.log('Seeded MfaMethods:', mfaMethods);

  // Seed Subscriptions
  const subscriptions = [
    { id: uuidv4(), user_profile_id: users[0].userId, plan: 'premium', start_date: new Date(), end_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), user_profile_id: users[1].userId, plan: 'basic', start_date: new Date(), end_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), createdAt: new Date(), updatedAt: new Date() },
  ];
  await db.Subscriptions.bulkCreate(subscriptions);
  console.log('Seeded Subscriptions:', subscriptions);

  // Seed RolePermissions
  const rolePermissions = [
    { id: uuidv4(), user_profile_id: users[0].userId, permission: 'admin_access', createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), user_profile_id: users[1].userId, permission: 'user_access', createdAt: new Date(), updatedAt: new Date() },
  ];
  await db.RolePermissions.bulkCreate(rolePermissions);
  console.log('Seeded RolePermissions:', rolePermissions);

  // Seed PaymentProviders
  const paymentProviders = [
    { id: uuidv4(), name: 'stripe', createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), name: 'paypal', createdAt: new Date(), updatedAt: new Date() },
  ];
  await db.PaymentProviders.bulkCreate(paymentProviders);
  console.log('Seeded PaymentProviders:', paymentProviders);

  // Seed PaymentTransactions
  const paymentTransactions = [
    { id: uuidv4(), user_profile_id: users[0].userId, subscription_id: subscriptions[0].id, provider_id: paymentProviders[0].id, amount: 19.99, status: 'completed', transaction_date: new Date(), createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), user_profile_id: users[1].userId, subscription_id: subscriptions[1].id, provider_id: paymentProviders[1].id, amount: 9.99, status: 'pending', transaction_date: new Date(), createdAt: new Date(), updatedAt: new Date() },
  ];
  await db.PaymentTransactions.bulkCreate(paymentTransactions);
  console.log('Seeded PaymentTransactions:', paymentTransactions);

  // Seed Permissions
  const permissions = [
    { id: uuidv4(), name: 'admin_access', description: 'Full administrative access', createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), name: 'user_access', description: 'Standard user access', createdAt: new Date(), updatedAt: new Date() },
  ];
  await db.Permissions.bulkCreate(permissions);
  console.log('Seeded Permissions:', permissions);

  // Seed Roles
  const roles = [
    { id: uuidv4(), name: 'admin', description: 'Administrator role', createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), name: 'user', description: 'Standard user role', createdAt: new Date(), updatedAt: new Date() },
  ];
  await db.Roles.bulkCreate(roles);
  console.log('Seeded Roles:', roles);

  // Seed SocialProviders
  const socialProviders = [
    { id: uuidv4(), name: 'facebook', createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), name: 'twitter', createdAt: new Date(), updatedAt: new Date() },
  ];
  await db.SocialProviders.bulkCreate(socialProviders);
  console.log('Seeded SocialProviders:', socialProviders);

  // Seed SocialProfiles
  const socialProfiles = [
    { id: uuidv4(), user_profile_id: users[0].userId, provider_id: socialProviders[0].id, provider_user_id: 'fb123', createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), user_profile_id: users[1].userId, provider_id: socialProviders[1].id, provider_user_id: 'tw123', createdAt: new Date(), updatedAt: new Date() },
  ];
  await db.SocialProfiles.bulkCreate(socialProfiles);
  console.log('Seeded SocialProfiles:', socialProfiles);

  // Seed Statistics
  const statistics = [
    { id: uuidv4(), user_profile_id: users[0].userId, metric: 'posts_created', value: 5, recorded_at: new Date(), createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), user_profile_id: users[1].userId, metric: 'comments_made', value: 3, recorded_at: new Date(), createdAt: new Date(), updatedAt: new Date() },
  ];
  await db.Statistics.bulkCreate(statistics);
  console.log('Seeded Statistics:', statistics);

  // Seed Tags
  const tags = [
    { id: uuidv4(), name: 'Technology', createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), name: 'Lifestyle', createdAt: new Date(), updatedAt: new Date() },
  ];
  await db.Tags.bulkCreate(tags);
  console.log('Seeded Tags:', tags);

  // Seed ContentTags
  const contentTags = [
    { id: uuidv4(), content_id: content[0].id, tag_id: tags[0].id, createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), content_id: content[1].id, tag_id: tags[1].id, createdAt: new Date(), updatedAt: new Date() },
  ];
  await db.ContentTags.bulkCreate(contentTags);
  console.log('Seeded ContentTags:', contentTags);

  // Seed UserRoles
  const userRoles = [
    { id: uuidv4(), user_profile_id: users[0].userId, role_id: roles[0].id, createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), user_profile_id: users[1].userId, role_id: roles[1].id, createdAt: new Date(), updatedAt: new Date() },
  ];
  await db.UserRoles.bulkCreate(userRoles);
  console.log('Seeded UserRoles:', userRoles);

  // Seed ContentAnalysis
  const contentAnalysis = [
    { id: uuidv4(), content_id: content[0].id, analysis_type: 'sentiment', result: { sentiment: 'positive' }, createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), content_id: content[1].id, analysis_type: 'sentiment', result: { sentiment: 'neutral' }, createdAt: new Date(), updatedAt: new Date() },
  ];
  await db.ContentAnalysis.bulkCreate(contentAnalysis);
  console.log('Seeded ContentAnalysis:', contentAnalysis);

  // Seed SubscriptionGracePeriods
  const subscriptionGracePeriods = [
    { id: uuidv4(), subscription_id: subscriptions[0].id, start_date: new Date(), end_date: new Date(new Date().setDate(new Date().getDate() + 7)), reason: 'Payment delay', createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), subscription_id: subscriptions[1].id, start_date: new Date(), end_date: new Date(new Date().setDate(new Date().getDate() + 7)), reason: 'Trial extension', createdAt: new Date(), updatedAt: new Date() },
  ];
  await db.SubscriptionGracePeriods.bulkCreate(subscriptionGracePeriods);
  console.log('Seeded SubscriptionGracePeriods:', subscriptionGracePeriods);
};