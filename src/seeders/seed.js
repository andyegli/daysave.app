import { v4 as uuidv4 } from 'uuid';

   async function seed() {
     try {
       const db = (await import('../models/index.js')).default;

       const user = await db.UserProfiles.create({
         userId: '550e8400-e29b-41d4-a716-446655440000',
         username: 'testuser',
         email: 'testuser@example.com',
       });

       await db.AuthProviders.create({
         id: uuidv4(),
         user_profile_id: user.userId,
         provider: 'local',
         hashed_password: 'password123', // Plain text for testing; use bcrypt in production
       });

       await db.Content.create({
         id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
         userId: user.userId,
         title: 'My First Post',
         body: 'This is my first post!',
       });

       await db.Content.create({
         id: '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
         userId: user.userId,
         title: 'Another Post',
         body: 'This is another post!',
       });

       console.log('Database seeded successfully!');
     } catch (error) {
       console.error('Error seeding database:', error);
     } finally {
       const db = (await import('../models/index.js')).default;
       await db.sequelize.close();
     }
   }

   seed();