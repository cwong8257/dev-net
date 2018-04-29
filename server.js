require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const configurePassport = require('./config/passport');

const app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/devconnector');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
configurePassport(passport);

// Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
