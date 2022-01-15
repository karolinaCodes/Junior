const express = require('express');
const router = express.Router();

module.exports = ({getDevs}) => {
  /* GET users listing. */
  router.get('/', (req, res) => {
    getDevs()
      .then(users => res.json(users))
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
