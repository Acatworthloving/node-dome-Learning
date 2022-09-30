/**
 * login & register
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../models/User');
const keys = require('../../config/keys');
const routerResponse = require('../../config/routerResponse');

/**
 * router Post api/users/register
 */
router.post('/register', (req, res) => {
  // 查询数据库是否email重复
  const { email, password, name, identity } = req.body;
  if (!email || !name) {
    return routerResponse.fail(res, 419);
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      return routerResponse.fail(res, 420);
    } else {
      const avatar = gravatar.url(email, {
        protocol: 'http',
        s: '100',
      });
      const newUser = new User({
        name,
        email,
        avatar,
        identity,
        password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          // Store hash in your password DB.
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => routerResponse.success(res, user))
            .catch((err) => routerResponse.fail(res, 400, err.message || null));
        });
      });
    }
  });
});

/**
 * router Post api/users/login
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) {
      return routerResponse.fail(res, 419);
    }
    //验证比对密码是否正确
    bcrypt.compare(password, user.password, (err, isTrue) => {
      if (isTrue) {
        const rule = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          identity: user.identity,
          email: user.email,
        };
        // 规则、加密名字、过期时间、箭头函数
        jwt.sign(
          rule,
          keys.secretOrKey,
          { expiresIn: 60 * 60 * 24 },
          (err, token) => {
            if (err) throw err;
            return routerResponse.success(res, {
              ...rule,
              token: `Bearer ${token}`,
            });
          }
        );
      } else {
        return routerResponse.fail(res, 418);
      }
    });
  });
});

/**
 * router Get api/users/current
 */
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { id, name, email, password, avatar, identity } = req.user;
    return routerResponse.success(res, {
      id,
      name,
      email,
      password,
      avatar,
      identity,
    });
  }
);

module.exports = router;
