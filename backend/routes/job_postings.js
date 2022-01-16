const express = require('express');
const router = express.Router();

module.exports = ({getJobPostings, getJobById, addJobPosting}) => {
  /* GET list of jobs */
  router.get('/', (req, res) => {
    getJobPostings()
      .then(job => res.json(job))
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  // return data for single job post based on its jobPostingId
  router.get('/:id', (req, res) => {
    getJobById(req.params.id)
      .then(job => res.json(job))
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  /* POST a new job posting */
  router.post('/new', (req, res) => {
    const {
      employer_id,
      job_title,
      description,
      city,
      salary_min,
      salary_max,
      type,
      is_remote,
      date_posted,
      is_open
    } = req.body;

    addJobPosting(employer_id,
      job_title,
      description,
      city,
      salary_min,
      salary_max,
      type,
      is_remote,
      date_posted,
      is_open)
      .then(newJobPosting => res.json(newJobPosting))
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
