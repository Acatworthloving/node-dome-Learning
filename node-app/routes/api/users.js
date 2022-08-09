/**
 * login & register
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../../models/User');

/**
 * router GET api/users/test
 */
router.get('/test', (req, res) => {
  res.json({ aa: 'test' });
});

/**
 * router Post api/users/register
 */
router.post('/register', (req, res) => {
  // 查询数据库是否email重复
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: '邮箱被占用' });
    } else {
      const newUser = new User({
        name: req.body.email,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          // Store hash in your password DB.
          if (err) throw err;
          console.log(newUser);
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log('newUser err', err));
        });
      });
    }
  });
});

module.exports = router;
