const express = require('express');
const router = express.Router();
const {getPostsByUsers} = require('../helpers/dataHelpers');

module.exports = ({getDevs, getUserByEmail, addUser, getUsersPosts}) => {
  router.get('/', (req, res) => {
    getDevProjects()
      .then(devProjects => {
        const formattedProjects = getProjectsByDevs(devProjects);
        res.json(formattedProjects);
      })
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  router.post('/', (req, res) => {
    const {
      first_name,
      last_name,
      email,
      password,
      bio,
      photo_url,
      github_url,
      linkedIn_url,
      resume_url,
      location,
    } = req.body;

    getDevByEmail(email)
      .then(dev => {
        if (dev.email) {
          //changed from original
          res.json({
            msg: 'Sorry, an account with this email already exists',
          });
        } else {
          return addDev(
            first_name,
            last_name,
            email,
            password,
            bio,
            photo_url,
            github_url,
            linkedIn_url,
            resume_url,
            location
          );
        }
      })
      .then(newDev => res.json(newDev))
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
