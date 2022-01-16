const express = require('express');
const router = express.Router();

module.exports = ({getProjectById}) => {
  // GET single project by project id
  router.get('/:id', (req, res) => {
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
