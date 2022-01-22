// DB queries for DEV PROJECTS //

module.exports = db => {
  const getSavedJobsGigsByUserId = id => {
    const query = {
      text: `SELECT * FROM saved_jobs_gigs WHERE id= $1`,
      values: [id],
    };

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  return {
    getSavedJobsGigsByUserId,
  };
};
