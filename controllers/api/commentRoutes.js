const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
  // create Comment
  console.log(req.body);
  try {
    const NewComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(NewComment);
  } catch (err) {
    // console.log(err);
    res.status(400).json(err);
  }

});


module.exports = router;