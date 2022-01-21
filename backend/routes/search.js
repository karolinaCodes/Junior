const express = require('express');
const router = express.Router();

module.exports = ({
  getJobsAndGigsByQuery,
  getJobsByCity,
  getJobsByType,
  getJobsByMulti,
}) => {
  /* GET list of job and gigs by query string*/
  router.get('/query', (req, res) => {
    console.log(req.query.queryString);
    getJobsAndGigsByQuery(req.query.queryString)
      .then(job => res.json(job))
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  /* GET list of job and gigs by city */
  router.get('/city', (req, res) => {
    console.log(req.query.city);
    getJobsByCity(req.query.city)
      .then(job => res.json(job))
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  /* GET list of job and gigs by type */
  router.get('/type', (req, res) => {
    getJobsByType(req.query.type)
      .then(job => res.json(job))
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  router.get('/multi-filter', (req, res) => {
    console.log(req.query);
    console.log('ehlo?');
    getJobsByMulti(req.query)
      .then(job => res.json(job))
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
