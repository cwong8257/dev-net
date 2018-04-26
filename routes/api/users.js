const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../models/User');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const router = express.Router();

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    }
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      avatar,
      password: hash,
    });
    const savedUser = await newUser.save();

    return res.json(savedUser);
  } catch (err) {
    return console.log(err);
  }
});

// @route   POST api/users/login
// @desc    Login user / Return JWT Token
// @access  Public
router.post('/login', async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      errors.password = 'Password incorrect';
      return res.status(400).json(errors);
    }
    const { id, name, avatar } = user;
    const payload = { id, name, avatar };
    const token = jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: 3600 });

    return res.json({ success: true, token: `Bearer ${token}` });
  } catch (err) {
    return console.log(err);
  }
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id, name, email } = req.user;
  res.json({ id, name, email });
});

module.exports = router;
