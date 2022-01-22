// DB queries for DEV PROJECTS //

module.exports = db => {
  const getSavedJobsGigsByUserId = devId => {
    const q1 = {
      text: `SELECT saved_jobs.*, job_postings.*, employers.*,
      trim(to_char(salary/100, '999,999,990')) as formatted_salary,
      to_char(date_posted,'FMMonth DD, YYYY') as formatted_date,
      CONCAT(job_postings.city,', Canada') as posting_location
      FROM saved_jobs
      JOIN job_postings
      ON saved_jobs.job_posting_id = job_postings.id
      JOIN employers
      ON job_postings.employer_id = employers.id
      WHERE junior_dev_id= $1`,
      values: [devId],
    };

    const q2 = {
      text: `SELECT saved_gigs.*, gig_postings.*, employers.*,
      trim(to_char(pay/100, '999,999,990')) as formatted_pay,
      to_char(date_posted,'FMMonth DD, YYYY') as formatted_deadline_date
      FROM saved_gigs
      JOIN gig_postings
      ON saved_gigs.gig_posting_id = gig_postings.id
      JOIN employers
      ON gig_postings.employer_id = employers.id
      WHERE junior_dev_id= $1`,
      values: [devId],
    };

    return db
      .query(q1)
      .then(result1 => {
        const jobs = result1.rows;
        return db.query(q2).then(result2 => {
          const gigs = result2.rows;
          return {jobs, gigs};
        });
      })
      .catch(err => err);
  };

  return {
    getSavedJobsGigsByUserId,
  };
};
