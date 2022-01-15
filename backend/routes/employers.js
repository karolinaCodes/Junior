const express = require('express');
const router = express.Router();

module.exports = ({getEmployers}) => {
  router.get('/', (req, res) => {
    getEmployers()
      .then(employers => res.json(employers))
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });
  return router;
};
