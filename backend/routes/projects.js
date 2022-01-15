const express = require('express');
const router = express.Router();

module.exports = ({getProjectsByDevId, getProjectById}) => {
  // get all projects for single dev, with dev info
  router.get('/:devId', (req, res) => {
    getProjectsByDevId(req.params.devId)
      .then(projects => {
        res.json(projects);
      })
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  // GET single project by project id
  router.get('/project/:id', (req, res) => {
    getProjectById(req.params.id)
      .then(project => {
        res.json(project);
      })
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  router.post('/', (req, res) => {
    const {
      junior_dev_id,
      title,
      description,
      thumbnail_photo_url,
      github_link,
      live_link,
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
