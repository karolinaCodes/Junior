// DB queries for EMPLOYERS //

module.exports = db => {
	const getEmployers = () => {
		const query = {
			text: 'SELECT * FROM employers',
		};

		return db
			.query(query)
			.then(result => result.rows)
			.catch(err => err);
	};

	const getEmployerById = id => {
		const query = {
			text: 'SELECT * FROM employers WHERE id = $1',
			values: [id],
		};

		return db
			.query(query)
			.then(result => result.rows[0])
			.catch(err => err);
	};

	// Job and gig posting by employer ID //
	const getJobPostingsByEmployerId = id => {
		const query = {
			text: `SELECT job_postings.id as job_posting_id, 
				employer_id, company_name, email, bio, employers.photo_url as employer_photo_url, 
				job_postings.*,
				applications_table.total_applications,
				trim(to_char(salary/100, '999,999,990')) as formatted_salary,
        to_char(date_posted,'FMMonth FMDD, YYYY') as formatted_date,
				CONCAT(job_postings.city,', Canada') as posting_location
        FROM job_postings
        JOIN employers ON employers.id = job_postings.employer_id
				LEFT JOIN (
					SELECT job_posting_id as selected_posting_id,
					COUNT(job_posting_id) as total_applications
					FROM job_applications
					GROUP BY selected_posting_id
					) AS applications_table
					ON job_postings.id = selected_posting_id
        WHERE employer_id = $1
				ORDER BY job_posting_id
				`,
			values: [id],
		};

		return db
			.query(query)
			.then(result => result.rows)
			.catch(err => err);
	};

	const getGigPostingsByEmployerId = id => {
		const query = {
			text: `SELECT gig_postings.id as gig_posting_id, employer_id, 
				company_name, email, bio, employers.photo_url as employer_photo_url, 
				gig_postings.*, trim(to_char(pay/100, '999,999,990')) as formatted_pay,
				gig_postings.id as gig_posting_id,
				applications_table.total_applications,
				to_char(date_posted,'FMMonth FMDD, YYYY') as formatted_date,
				to_char(deadline,'FMMonth FMDD, YYYY') as formatted_deadline
        FROM gig_postings
        JOIN employers ON employers.id = gig_postings.employer_id
				LEFT JOIN (
					SELECT gig_posting_id as selected_posting_id,
					COUNT(gig_posting_id) as total_applications
					FROM gig_applications
					GROUP BY selected_posting_id
					) AS applications_table
					ON gig_postings.id = selected_posting_id
        WHERE employers.id = $1
				ORDER BY gig_posting_id
				`,
			values: [id],
		};

		return db
			.query(query)
			.then(result => result.rows)
			.catch(err => err);
	};

	// Job and gig applications by employer id //
	const getAllJobApplicationsForEmployer = id => {
		const query = {
			text: `SELECT job_applications.*, job_applications.id as app_id, job_postings.*, job_postings.id as post_id, employers.id as employer_id,
        junior_devs.id as dev_id, junior_devs.email as dev_email, first_name, last_name, junior_devs.bio as dev_bio, junior_devs.photo_url as dev_photo_url,
        trim(to_char(salary/100, '999,999,990')) as formatted_salary,
        to_char(date_posted,'FMMonth FMDD, YYYY') as formatted_date,
        to_char(date_applied,'FMMonth FMDD, YYYY') as formatted_date_applied,
				CONCAT(job_postings.city,', Canada') as posting_location,
				CONCAT(junior_devs.city,', Canada') as dev_location
        FROM job_applications
        JOIN job_postings ON job_applications.job_posting_id = job_postings.id
        JOIN employers ON job_postings.employer_id = employers.id
        JOIN junior_devs ON job_applications.junior_dev_id = junior_devs.id
        WHERE job_postings.employer_id = $1`,
			values: [id],
		};

		return db
			.query(query)
			.then(result => result.rows)
			.catch(err => err);
	};

	const getAllGigApplicationsForEmployer = id => {
		const query = {
			text: `SELECT gig_applications.*, gig_applications.id as app_id, gig_postings.id as post_id, employers.id as employer_id,
        junior_devs.id as dev_id, junior_devs.email as dev_email, first_name, last_name, junior_devs.bio as dev_bio, junior_devs.photo_url as dev_photo_url,
        trim(to_char(pay/100, '999,999,990')) as formatted_pay,
        to_char(date_posted,'FMMonth FMDD, YYYY') as formatted_date,
        to_char(deadline,'FMMonth FMDD, YYYY') as formatted_deadline,
        to_char(date_applied,'FMMonth FMDD, YYYY') as formatted_date_applied,
				CONCAT(junior_devs.city,', Canada') as dev_location
        FROM gig_applications
        JOIN gig_postings ON gig_applications.gig_posting_id = gig_postings.id
        JOIN employers ON gig_postings.employer_id = employers.id
        JOIN junior_devs ON gig_applications.junior_dev_id = junior_devs.id
        WHERE gig_postings.employer_id = $1`,
			values: [id],
		};

		return db
			.query(query)
			.then(result => result.rows)
			.catch(err => err);
	};

	const editEmployerProfile = params => {
		const query = {
			text: `UPDATE employers
				SET email = $1,
				company_name = $2,
				bio = $3
				WHERE id = $4
				RETURNING *
				`,
			values: [
				params.email,
				params.company_name,
				params.bio,
				params.employer_id,
			],
		};
		return db
			.query(query)
			.then(result => console.log(result))
			.catch(err => err);
	};

	return {
		getEmployers,
		getEmployerById,
		getJobPostingsByEmployerId,
		getGigPostingsByEmployerId,
		getAllJobApplicationsForEmployer,
		getAllGigApplicationsForEmployer,
		editEmployerProfile,
	};
};
