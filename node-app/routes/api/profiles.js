/**
 * profiles
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');

const Profile = require('../../models/Profile');
const routerResponse = require('../../config/routerResponse');

/**
 * router Post api/profiles
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    new Profile(req.body)
      .save()
      .then((profile) => routerResponse.success(res, profile))
      .catch((err) => routerResponse.fail(res, 400, err.message || null));
  }
);

/**
 * router Get api/profiles
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.find()
      .then((profile) => routerResponse.success(res, profile || []))
      .catch((err) => routerResponse.fail(res, 400, err.message || null));
  }
);

/**
 * router Get api/profiles/:id
 */
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ _id: req.params.id })
      .then((profile) => routerResponse.success(res, profile || []))
      .catch((err) => routerResponse.fail(res, 400, err.message || null));
  }
);

/**
 * router put api/profiles/:id
 */
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
      .then((profile) => routerResponse.success(res, profile || []))
      .catch((err) => routerResponse.fail(res, 400, err.message || null));
  }
);

/**
 * router delete api/profiles/:id
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findByIdAndRemove({ _id: req.params.id })
      .then((profile) => {
        if (profile) {
          routerResponse.success(res);
        } else {
          routerResponse.fail(res, 421);
        }
      })
      .catch((err) => routerResponse.fail(res, 400, err.message || null));
  }
);

module.exports = router;
