const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

// import api
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');

// DB config
const dbURL = require('./config/keys').mongoURI;

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to mongodb
mongoose
  .connect(dbURL)
  .then(() => {
    console.log('MongooDB Connect');
  })
  .catch((err) => {
    console.error(err);
  });

// passport 初始化
app.use(passport.initialize());
require('./config/passport')(passport);

// router
app.use('/api/users', users);
app.use('/api/profiles', profiles);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
