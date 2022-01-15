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
  return router;
};
