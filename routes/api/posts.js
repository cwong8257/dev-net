const express = require('express');
const passport = require('passport');

const Post = require('../../models/Post');
const validatePostInput = require('../../validation/post');

const router = express.Router();

// @route POST api/posts/
// @desc Create post
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const {
    text, name, avatar, user,
  } = req.body;
  const newPost = new Post({
    text,
    name,
    avatar,
    user,
  });

  try {
    const savedPost = await newPost.save();
    return res.json(savedPost);
  } catch (err) {
    errors.server = 'Something went wrong!';
    return res.status(404).json(errors);
  }
});

module.exports = router;
