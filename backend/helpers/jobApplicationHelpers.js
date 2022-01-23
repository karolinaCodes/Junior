// DB queries for JOB APPLICATIONS //

module.exports = db => {
	// Job Applications //
	/* Retrieve all job application data, job posting data,
    employer email, company_name, bio, photo_url,
    junior_dev email, first_name, last_name, bio, photo_url,
    github_url, linkedin_url, resume_url, location
  */

	const getJobApplicationById = id => {
		const query = {
			text: `SELECT job_applications.*, job_postings.*, 
        employers.email as employer_email, company_name, employers.bio as employer_bio, employers.photo_url as employer_photo_url,
        junior_devs.email as dev_email, first_name, last_name,phone_number,headline, junior_devs.bio as dev_bio, junior_devs.photo_url as dev_photo_url,
        trim(to_char(salary/100, '999,999,990')) as formatted_salary,
        to_char(date_posted,'FMMonth DD, YYYY') as formatted_date,
        to_char(date_applied,'FMMonth DD, YYYY') as formatted_date_applied
        FROM job_applications
        JOIN job_postings ON job_applications.job_posting_id = job_postings.id
        JOIN employers ON job_postings.employer_id = employers.id
        JOIN junior_devs ON job_applications.junior_dev_id = junior_devs.id
        WHERE job_applications.id = $1`,
			values: [id],
		};

		return db
			.query(query)
			.then(result => result.rows[0])
			.catch(err => err);
	};

	const addJobApplication = (job_posting_id, junior_dev_id) => {
		const query = {
			text: `INSERT INTO job_applications (
        job_posting_id, junior_dev_id
        ) VALUES ($1, $2) RETURNING *`,
			values: [job_posting_id, junior_dev_id],
		};

		return db
			.query(query)
			.then(result => result.rows[0])
			.catch(err => err);
	};

	const acceptJobApplication = job_application_id => {
		const query = {
			text: `UPDATE job_applications
      SET is_accepted = true
      WHERE id = $1`,
			values: [job_application_id],
		};

		return db
			.query(query)
			.then(result => result.rows[0])
			.catch(err => err);
	};

	return {
		getJobApplicationById,
		addJobApplication,
		acceptJobApplication,
	};
};
