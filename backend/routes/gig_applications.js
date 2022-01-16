const express = require('express');
const router = express.Router();

<<<<<<< HEAD
/* Get gig application based on gig application id*/
module.exports = ({getGigApplicationById}) => {
=======
module.exports = ({getGigApplicationById, addGigApplication}) => {
  /* GET a gig application by gig_applications.id */
>>>>>>> main
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
