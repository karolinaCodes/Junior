const express = require('express');
const router = express.Router();

/* Get all job applications */
module.exports = ({getJobApplications}) => {
  router.get('/', (req, res) => {
    getJobApplications()
      .then(applications => res.json(applications))
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });
  return router;
};
