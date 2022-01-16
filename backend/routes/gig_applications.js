const express = require('express');
const router = express.Router();

/* Get gig application based on gig application id*/
module.exports = ({getGigApplicationById}) => {
  router.get('/:id', (req, res) => {
    getGigApplicationById(req.params.id)
      .then(job => res.json(job))
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
