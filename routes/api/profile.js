const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

const router = express.Router();

// @route GET api/profile
// @desc Get current users profile
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const errors = {};

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      errors.profile = 'There is no profile for this user';
      return res.status(404).json(errors);
    }
    return res.json(profile);
  } catch (err) {
    return res.status(404).json(err);
  }
});

// @route POST api/profile
// @desc Create user profile
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const errors = {};
  const profileFields = {};
  const standardFields = ['handle', 'company', 'location', 'bio', 'status', 'githubUsername'];
  const socialFields = ['youtube', 'twitter', 'facebook', 'linkedin', 'instagram'];

  profileFields.user = req.user.id;

  standardFields.forEach((field) => {
    if (req.body[field]) profileFields[field] = req.body[field];
  });

  profileFields.social = {};

  socialFields.forEach((field) => {
    if (req.body[field]) profileFields.social[field] = req.body[field];
  });

  if (typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',').map(word => word.trim());
  }

  try {
    const foundProfileByUser = await Profile.findOne({ user: req.user.id });

    if (foundProfileByUser) {
      errors.profile = 'Profile already exists';
      return res.status(400).json(errors);
    }
    const foundProfileByHandle = await Profile.findOne({ handle: profileFields.handle });

    if (foundProfileByHandle) {
      errors.handle = 'That handle already exists';
      return res.status(400).json(errors);
    }
    const newProfile = await new Profile(profileFields).save();

    return res.json(newProfile);
  } catch (err) {
    return res.status(404).json(err);
  }
});

// @route PUT api/profile
// @desc Update user profile
// @access Private
router.put('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const errors = {};
  const profileFields = {};
  const standardFields = ['handle', 'company', 'location', 'bio', 'status', 'githubUsername'];
  const socialFields = ['youtube', 'twitter', 'facebook', 'linkedin', 'instagram'];

  profileFields.user = req.user.id;

  standardFields.forEach((field) => {
    if (req.body[field]) profileFields[field] = req.body[field];
  });

  profileFields.social = {};

  socialFields.forEach((field) => {
    if (req.body[field]) profileFields.social[field] = req.body[field];
  });

  if (typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',').map(word => word.trim());
  }

  try {
    const foundProfileByUser = await Profile.findOne({ user: req.user.id });

    if (!foundProfileByUser) {
      errors.profile = 'Profile does not exist exists';
      return res.status(400).json(errors);
    }
    const foundProfileByHandle = await Profile.findOne({ handle: profileFields.handle });

    if (foundProfileByHandle) {
      errors.handle = 'That handle already exists';
      return res.status(400).json(errors);
    }
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true },
    );
    return res.json(updatedProfile);
  } catch (err) {
    return res.status(404).json(err);
  }
});

module.exports = router;
