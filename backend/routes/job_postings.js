const express = require('express');
const router = express.Router();

module.exports = ({
  getJobPostings,
  getJobById,
  getApplicationsByJobPostingId,
  addJobPosting,
}) => {
  /* GET list of all job postings with employer data*/
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

  router.get('/:id/applications', (req, res) => {
    getApplicationsByJobPostingId(req.params.id)
      .then(application => res.json(application))
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
      salary,
      job_type,
      is_remote,
      is_open,
    } = req.body;

    addJobPosting(
      employer_id,
      job_title,
      description,
      city,
      salary,
      job_type,
      is_remote,
      is_open
    )
      .then(newJobPosting => res.json(newJobPosting))
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
