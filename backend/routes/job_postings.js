const express = require('express');
const router = express.Router();

module.exports = ({getJobPostings}) => {
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

  // /* POST a new job posting */
  // router.post('/', (req, res) => {
  //   const {
  //     employer_id,
  //     job_title,
  //     description,
  //     city,
  //     salary_min,
  //     salary_max,
  //     type,
  //     is_remote,
  //     date_posted,
  //     is_open,
  //   } = req.body;

  //   newJobPosting =>
  //     res.json(newJobPosting).catch(err =>
  //       res.json({
  //         error: err.message,
  //       })
  //     );
  // });

  return router;
};
