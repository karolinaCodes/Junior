var express = require('express');
var router = express.Router();

module.exports = ({getSavedJobsGigsByUserId}) => {
  // GET all saved jobs and gigs by user id
  router.get('/:id', (req, res) => {
    const {id} = req.params;
    console.log(id);
    getSavedJobsGigsByUserId(id)
      .then(saved => {
        console.log(saved);
        res.json(saved);
      })
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  router.post('/:devId/:jobGigId:/:jobType', (req, res) => {
    const {id} = req.params;
    getSavedJobsGigsByUserId(id)
      .then(saved => {
        console.log(saved);
        res.json(saved);
      })
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
