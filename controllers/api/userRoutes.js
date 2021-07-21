const router = require('express').Router();
const { User } = require('../../models');


// POST /api/users
router.post('/', async (req, res) => {
    try {
      const dbUserData = await User.create(req.body);
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.logged_in = true;
        res.status(200).json(dbUserData);
      });
    } catch(err) {
      res.status(400).json(err);
    }
  });

  // LOGIN
  router.post('/login', async (req, res) => {
    try {
      const dbUserData = await User.findOne({ where: { email: req.body.email } });
     if (!dbUserData) {
        res.status(400).json({ message: 'Incorrect email or password, retry!' });
        return;
      }
  
      const validPassword = await dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Invalide email or password, retry!' });
        return;
      }
  
      req.session.save(() => {
        // declare session variables
        req.session.user_id = dbUserData.id;
        req.session.logged_in = true;
  
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    
    } catch (err) {
      res.status(400).json(err);
    }
  });


  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  });


module.exports = router;