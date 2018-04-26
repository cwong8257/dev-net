const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

const router = express.Router();

// @route GET api/profile/test
// @desc Tests profile route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'profile works' }));

// @route GET api/profile
// @desc Get current users profile
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const errors = {};

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      errors.noProfile = 'There is no profile for this user';
      return res.status(404).json(errors);
    }
    return res.json(profile);
  } catch (err) {
    return res.status(404).json(err);
  }
});

module.exports = router;
