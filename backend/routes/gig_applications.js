const express = require('express');
const router = express.Router();

/* Get all gig applications */
module.exports = ({getGigApplicationById, addGigApplication}) => {
  /* GET a gig posting by gig_postings.id */
  router.get('/:id', (req, res) => {
    getGigApplicationById(req.params.id)
      .then(job => res.json(job))
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  /* POST a new gig application */
  router.post('/new', (req, res) => {
    const {gig_posting_id, junior_dev_id} = req.body;
    addGigApplication(gig_posting_id, junior_dev_id)
      .then(newGigApplication => res.json(newGigApplication))
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
