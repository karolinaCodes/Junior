const express = require('express');
const router = express.Router();

module.exports = ({getDevs}) => {
  /* GET list of devs */
  router.get('/', (req, res) => {
    getDevs()
      .then(devs => res.json(devs))
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });
  return router;
};
