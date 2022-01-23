var express = require('express');
var router = express.Router();

module.exports = ({getSavedJobsGigsByUserId, saveJobGigs}) => {
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

  router.post('/', (req, res) => {
    const {devId, jobGigId, jobType} = req.body;
    console.log(devId, jobGigId, jobType);
    saveJobGigs(devId, jobGigId, jobType)
      .then(saved => {
        console.log(saved);
        return res.json(saved);
      })
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
