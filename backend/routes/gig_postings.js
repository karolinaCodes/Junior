const express = require('express');
const router = express.Router();

module.exports = ({getGigPostings, addGigPosting}) => {
  /* GET list of gigs - fix */
  // router.get('/', (req, res) => {
  //   getGigPostings()
  //     .then(job => res.json(job))
  //     .catch(err =>
  //       res.json({
  //         error: err.message,
  //       })
  //     );
  // });

  /* POST a new gig posting */
  router.post('/new', (req, res) => {
    const {employer_id, gig_name, description, pay, deadline, photo_url} =
      req.body;

    addGigPosting(employer_id, gig_name, description, pay, deadline, photo_url)
      .then(addedGig => {
        res.json(addedGig);
      })
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
