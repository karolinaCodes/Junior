// DB queries for JOB POSTINGS //

module.exports = db => {
	const getJobPostings = () => {
		const query = {
			text: `SELECT employers.id as employer_id, 
      company_name, email, bio, photo_url, 
      job_postings.*, trim(to_char(salary/100, '999,999,990')) as formatted_salary,
      to_char(date_posted,'FMMonth DD, YYYY') as formatted_date
      FROM employers
      JOIN job_postings ON employers.id = job_postings.employer_id`,
		};

		return db
			.query(query)
			.then(result => result.rows)
			.catch(err => err);
	};

	const getJobById = id => {
		const query = {
			text: `SELECT employers.id as employer_id, 
        company_name, email, bio, employers.photo_url as employer_photo_url, 
        job_postings.*, trim(to_char(salary/100, '999,999,990')) as formatted_salary,
        to_char(date_posted,'FMMonth DD, YYYY') as formatted_date
        FROM employers
        JOIN job_postings ON employers.id = job_postings.employer_id
        WHERE job_postings.id = $1`,
			values: [id],
		};

		return db
			.query(query)
			.then(result => result.rows[0])
			.catch(err => err);
	};

	const addJobPosting = (
		employer_id,
		job_title,
		description,
		city,
		salary,
		job_type,
		is_remote,
		is_open
	) => {
		const salary_cents = salary * 100;
		const query = {
			text: `INSERT INTO job_postings (
        employer_id,
        job_title,
        description,
        city,
        salary,
        job_type,
        is_remote,
        is_open
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8
        ) RETURNING *`,
			values: [
				employer_id,
				job_title,
				description,
				city,
				salary_cents,
				job_type,
				is_remote,
				is_open,
			],
		};

		return db
			.query(query)
			.then(result => result.rows[0])
			.catch(err => err);
	};

  const getApplicationsByJobPostingId = id => {
    const query = {
      text: `SELECT job_applications.*, job_postings.*, junior_devs.*, junior_devs.photo_url as dev_photo_url,
        trim(to_char(salary/100, '999,999,990')) as formatted_salary,
        to_char(date_posted,'FMMonth DD, YYYY') as formatted_date,
        to_char(date_applied,'FMMonth DD, YYYY') as formatted_date_applied
        FROM job_applications
        JOIN job_postings ON job_applications.job_posting_id = job_postings.id
        JOIN employers ON job_postings.employer_id = employers.id
        JOIN junior_devs ON job_applications.junior_dev_id = junior_devs.id
        WHERE job_applications.job_posting_id = $1`,
			values: [id],
		};

		return db
			.query(query)
			.then(result => result.rows)
			.catch(err => err);
	};

  return {
    getJobPostings,
    getJobById,
    getApplicationsByJobPostingId,
    addJobPosting,
  };
};