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

  router.post('/new', (req, res) => {
    const {
      junior_dev_id,
      title,
      description,
      thumbnail_photo_url,
      github_link,
      live_link,
    } = req.body;

    addProject(
      junior_dev_id,
      title,
      description,
      thumbnail_photo_url,
      github_link,
      live_link
    )
      .then(addedProject => {
        res.json(addedProject);
      })
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
