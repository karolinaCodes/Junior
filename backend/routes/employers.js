const express = require('express');
const router = express.Router();

module.exports = ({getEmployers, getEmployerById}) => {
  /* GET all employers */
  router.get('/', (req, res) => {
    getEmployers()
      .then(employers => res.json(employers))
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  /* GET single employer by id */
  router.get('/:id', (req, res) => {
    getEmployerById(req.params.id)
      .then(employer => res.json(employer))
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });
  return router;
};
