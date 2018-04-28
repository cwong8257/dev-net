const express = require('express');
const { ObjectId } = require('mongoose').Types;
const passport = require('passport');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

const router = express.Router();

// @route GET api/profile
// @desc Get current users profile
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const errors = {};

  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', [
      'name',
      'avatar',
    ]);

    if (!profile) {
      errors.profile = 'There is no profile for this user';
      return res.status(404).json(errors);
    }
    return res.json(profile);
  } catch (err) {
    errors.server = 'Something went wrong. Try again later';
    return res.status(404).json(errors);
  }
});

// @route GET api/profile/all
// @desc Get all profiles
// @access Public
router.get('/all', async (req, res) => {
  const errors = {};

  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);

    if (!profiles) {
      errors.profile = 'There are no profiles';
      return res.status(404).json(errors);
    }
    return res.json(profiles);
  } catch (err) {
    errors.profile = 'There are no profiles';
    return res.status(404).json(errors);
  }
});

// @route GET api/profile/handle/:handle
// @desc Get profile by handle
// @access Public
router.get('/handle/:handle', async (req, res) => {
  const errors = {};
  const { handle } = req.params;

  try {
    const profile = await Profile.findOne({ handle }).populate('user', ['name', 'avatar']);

    if (!profile) {
      errors.profile = 'There is no profile for this user';
      return res.status(404).json(errors);
    }
    return res.json(profile);
  } catch (err) {
    errors.server = 'Something went wrong. Try again later';
    return res.status(404).json(errors);
  }
});

// @route GET api/profile/user/:userId
// @desc Get profile by user ID
// @access Public
router.get('/user/:userId', async (req, res) => {
  const errors = {};
  const { userId } = req.params;

  if (!ObjectId.isValid(userId)) {
    errors.userId = 'Invalid user ID';
    return res.status(404).json(errors);
  }

  try {
    const profile = await Profile.findOne({ user: req.params.userId }).populate('user', [
      'name',
      'avatar',
    ]);

    if (!profile) {
      errors.profile = 'There is no profile for this user';
      return res.status(404).json(errors);
    }
    return res.json(profile);
  } catch (err) {
    errors.server = 'Something went wrong. Try again later';
    return res.status(404).json(errors);
  }
});

// @route POST api/profile
// @desc Create user profile
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const profileFields = {};
  const standardFields = [
    'handle',
    'company',
    'website',
    'location',
    'status',
    'skills',
    'bio',
    'githubUsername',
  ];
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
    const foundProfileById = await Profile.findOne({ user: req.user.id });
    const foundProfileByHandle = await Profile.findOne({ handle: profileFields.handle });

    if (
      foundProfileByHandle &&
      (!foundProfileById || foundProfileById.handle !== foundProfileByHandle.handle)
    ) {
      errors.handle = 'That handle is taken';
      return res.status(400).json(errors);
    }

    if (!foundProfileById) {
      const newProfile = await new Profile(profileFields).save();

      return res.json(newProfile);
    }
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true },
    );

    return res.json(updatedProfile);
  } catch (err) {
    errors.server = 'Something went wrong. Try again later';
    return res.status(404).json(errors);
  }
});

// @route POST api/profile/experience
// @desc Add experience to profile
// @access Private
router.post('/experience', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      errors.profile = 'Profile not found';
      return res.status(404).json(errors);
    }

    const {
      title, company, location, from, to, current, description,
    } = req.body;

    const newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    profile.experience.unshift(newExperience);
    const savedProfile = await profile.save();
    return res.json(savedProfile);
  } catch (err) {
    errors.server = 'Something went wrong. Try again later';
    return res.status(404).json(errors);
  }
});

// @route POST api/profile/education
// @desc Add education to profile
// @access Private
router.post('/education', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      errors.profile = 'Profile not found';
      return res.status(404).json(errors);
    }

    const {
      school, degree, fieldOfStudy, from, to, current, description,
    } = req.body;

    const newEducation = {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description,
    };

    profile.education.unshift(newEducation);
    const savedProfile = await profile.save();
    return res.json(savedProfile);
  } catch (err) {
    errors.server = 'Something went wrong. Try again later';
    return res.status(404).json(errors);
  }
});

// @route DELETE api/profile/experience/:experienceId
// @desc Delete experience from profile
// @access Private
router.delete(
  '/experience/:experienceId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const errors = {};

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.experienceId);

      profile.experience.splice(removeIndex, 1);

      const savedProfile = await profile.save();

      return res.json(savedProfile);
    } catch (err) {
      errors.server = 'Something went wrong. Try again later';
      return res.status(404).json(errors);
    }
  },
);

// @route DELETE api/profile/education/:educationId
// @desc Delete education from profile
// @access Private
router.delete(
  '/education/:educationId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const errors = {};

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      const removeIndex = profile.education.map(item => item.id).indexOf(req.params.educationId);

      profile.education.splice(removeIndex, 1);

      const savedProfile = await profile.save();

      return res.json(savedProfile);
    } catch (err) {
      errors.server = 'Something went wrong. Try again later';
      return res.status(404).json(errors);
    }
  },
);

// @route DELETE api/profile
// @desc Delete user and profile
// @access Private
router.delete('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const errors = {};
  const { id } = req.user;
  try {
    await Promise.all([Profile.findOneAndRemove({ user: id }), User.findOneAndRemove({ _id: id })]);

    return res.json({ success: true });
  } catch (err) {
    errors.server = 'Something went wrong. Try again later';
    return res.status(404).json(errors);
  }
});

module.exports = router;
