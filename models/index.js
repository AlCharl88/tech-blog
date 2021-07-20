const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//create associations
User.hasMany(Post, {
    foreignKey: 'user_id',
//    as: 'User_id',
    OnDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    // as: 'User_id',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    // as: 'User_id',
    OnDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    // as: 'User_id',
  });

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    // as: 'Post_id',
    OnDelete: 'CASCADE'
});
  
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    // as: 'Post_id',
    OnDelete: 'CASCADE'
});
  


module.exports = {
    User, 
    Post, 
    Comment,
};