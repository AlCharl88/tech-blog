const sequelize = require('../config/connection');
const { Comment, Post, User } = require('../models');


const seedPosts = require('./post-seeds');
const seedUsers = require('./user-seeds');
const seedComments = require('./comment-seeds');


const seedAll = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(seedUsers, {
    individualHooks: true,
    returning: true,
  });

  // for (const comment of seedComments) {
  const comments = await Comment.bulkCreate(seedComments, {

    individualHooks: true,
    returning: true,
    // ...comment,
    // user_id: users[Math.floor(Math.random() * users.length)].id,
  });

// for (const post of seedPosts) {
  const posts = await Post.bulkCreate(seedPosts, {

    individualHooks: true,
    returning: true,
    // ...post,
    // user_id: users[Math.floor(Math.random() * users.length)].id,
  });
  


    console.log('\n----- DATABASE SYNCED -----\n');
  
    console.log('\n----- COMMENTS SEEDED -----\n');
  
    console.log('\n----- POSTS SEEDED -----\n');

    console.log('\n----- USERS SEEDED -----\n');

  process.exit(0);
};

seedAll();
