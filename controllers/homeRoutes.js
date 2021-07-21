const router = require('express').Router();
// const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
    // console.log(req.session);
    
    try { 
      // Get all posts JOIN with user data
      const dbPostData = await Post.findAll({
      include: [
        {
          model: Comment
         },
          {
            model: User,
            attributes: ['username']
          }, 
      ],
    });
      //  Serialize data so the template can read it
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        res.render('/login', {
            posts,
            logged_in: req.session.logged_in
          });
      }catch(err) {
        // console.log(err);
        res.status(500).json(err);
      };
  });

  // Get all post by id
  router.get('/post/:id', async (req, res) => {
    try {
      const dbPostData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['username']
          },
          {
            model: Comment,
            include: [
              {
                model: User,
              },
            ],
          },
        ],
  });

  // console.log(JSON.stringify(dbPostData));

  const post = dbPostData.get({ plain: true });
  res.render('post', {
    ...post,
    logged_in: req.session.logged_in
  });

} catch (err) {
  res.status(500).json(err);
}
})

// Use withAuth to prevent access to route

router.get('/profile', withAuth, async (req, res) => {
    try
    // Find the logged in person based on the session ID
    {
      const dbUserData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [ 
          { 
            model: Post,
          },
          {
            model: Comment,
          } ]
        })
        const user = dbUserData.get({ plain: true });
        res.render('profile', {
          ...user,
          logged_in: true
        });
    } catch(err) {
      res.status(500).json(err);
    }
  });

  router.get('/login', (req, res) => {
    // If the user is already loggged in, redirect  the request to anothe rroute
    if (req.session.logged_in) {
      res.redirect('/profile');
      return
    }
    res.render('/login')
  });

  // router.get('/signup', (req, res) => {
  //   if (req.session.logged_in) {
  //     res.redirect('/');
  //     return;
  //   }
  
  //   res.render('signup');
  // });

  

module.exports = router;