// DB queries for DEVS //

module.exports = db => {
	const getDevs = () => {
		const query = {
			text: 'SELECT * FROM junior_devs',
		};

		return db
			.query(query)
			.then(result => result.rows)
			.catch(err => err);
	};

	const getUserByEmail = email => {
		const q1 = {
			text: `SELECT * FROM junior_devs WHERE email = $1`,
			values: [email],
		};

		const q2 = {
			text: `SELECT * FROM employers WHERE email = $1`,
			values: [email],
		};

		return db
			.query(q1)
			.then(result1 => {
				const junior_dev = result1.rows[0];
				return db.query(q2).then(result2 => {
					const employer = result2.rows[0];
					return junior_dev || employer;
				});
			})
			.catch(err => err);
	};

	const getDevById = id => {
		const query = {
			text: `SELECT * FROM junior_devs WHERE id = $1`,
			values: [id],
		};

		return db
			.query(query)
			.then(result => result.rows[0])
			.catch(err => err);
	};

	const getProjectsByDevId = id => {
		const query = {
			text: `SELECT junior_devs.id as junior_dev_id, first_name, last_name, email,
        projects.id as project_id, title, description, thumbnail_photo_url, github_link, live_link
        FROM junior_devs
        INNER JOIN projects
        ON junior_devs.id = projects.junior_dev_id
        WHERE junior_dev_id= $1
				ORDER BY project_id DESC
        `,
			values: [id],
		};

		return db
			.query(query)
			.then(result => result.rows)
			.catch(err => err);
	};

	const getJobApplicationsByDevId = junior_dev_id => {
		const query = {
			text: `
        SELECT job_applications.id as app_id, job_applications.*, job_postings.*,
        employers.email as employer_email, company_name, employers.bio as employer_bio, employers.photo_url as employer_photo_url,
        junior_devs.email as dev_email, first_name, last_name,phone_number, headline, junior_devs.bio as dev_bio, junior_devs.photo_url as dev_photo_url,
				CONCAT(job_postings.city,', Canada') as posting_location,
        trim(to_char(salary/100, '999,999,990')) as formatted_salary,
        to_char(date_posted,'FMMonth FMDD, YYYY') as formatted_date,
        to_char(date_applied,'FMMonth FMDD, YYYY') as formatted_date_applied
        FROM job_applications
        JOIN job_postings ON job_applications.job_posting_id = job_postings.id
        JOIN junior_devs ON job_applications.junior_dev_id = junior_devs.id
        JOIN employers ON job_postings.employer_id = employers.id
        WHERE job_applications.junior_dev_id = $1
				ORDER BY app_id DESC
        `,
			values: [junior_dev_id],
		};

		return db
			.query(query)
			.then(result => result.rows)
			.catch(err => err);
	};

	const getGigApplicationsByDevId = junior_dev_id => {
		const query = {
			text: `
        SELECT gig_applications.id as app_id,
				gig_applications.*, gig_postings.*,
        trim(to_char(pay/100, '999,999,990')) as formatted_pay,
        employers.email as employer_email, company_name, employers.bio as employer_bio, employers.photo_url as employer_photo_url,
        junior_devs.email as dev_email, first_name, last_name,phone_number, headline, junior_devs.bio as dev_bio, junior_devs.photo_url as dev_photo_url,
        to_char(date_posted,'FMMonth FMDD, YYYY') as formatted_date,
        to_char(deadline,'FMMonth FMDD, YYYY') as formatted_deadline,
        to_char(date_applied,'FMMonth FMDD, YYYY') as formatted_date_applied
        FROM gig_applications
        JOIN gig_postings ON gig_applications.gig_posting_id = gig_postings.id
        JOIN junior_devs ON gig_applications.junior_dev_id = junior_devs.id
        JOIN employers ON gig_postings.employer_id = employers.id
        WHERE gig_applications.junior_dev_id = $1
				ORDER BY app_id DESC
        `,
			values: [junior_dev_id],
		};

		return db
			.query(query)
			.then(result => result.rows)
			.catch(err => err);
	};

	// STRETCH //

	// Sign up new dev
	const addDev = (
		first_name,
		last_name,
		email,
		password,
		phone_number,
		headline,
		bio,
		photo_url,
		github_url,
		linkedin_url,
		resume_url,
		location
	) => {
		const query = {
			text: `INSERT INTO junior_devs (first_name, last_name, email, password, phone_number, headline, bio, photo_url, github_url, linkedin_url, resume_url, location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
			values: [
				email,
				password,
				phone_number,
				headline,
				photo_url,
				github_url,
				linkedin_url,
				resume_url,
				location,
			],
		};

		return db
			.query(query)
			.then(result => result.rows[0])
			.catch(err => err);
	};

	// Get all accepted job applications by dev id
	const getAcceptedJobApplications = junior_dev_id => {
		const query = {
			text: `SELECT * FROM job_applications
      WHERE is_accepted = true
			AND junior_dev_id = $1`,
			values: [junior_dev_id],
		};

		return db
			.query(query)
			.then(result => result.rows[0])
			.catch(err => err);
	};

	// Get all accepted gig applications by dev id
	const getAcceptedGigApplications = junior_dev_id => {
		const query = {
			text: `SELECT * FROM gig_applications
      WHERE is_accepted = true
      AND junior_dev_id = $1`,
			values: [junior_dev_id],
		};

		return db
			.query(query)
			.then(result => result.rows[0])
			.catch(err => err);
	};

	const getAcceptedGigs = junior_dev_id => {
		const query = {
			text: `SELECT * FROM 
			gig_applications
			JOIN gig_postings
			ON gig_posting_id = gig_postings.id
      WHERE junior_dev_id = $1
			AND is_accepted = true`,
			values: [junior_dev_id],
		};

		return db
			.query(query)
			.then(result => result.rows)
			.catch(err => err);
	};

	const editProfile = params => {
		const query = {
			text: `UPDATE junior_devs
				SET email = $1,
				phone_number = $2,
				headline = $3,
				bio = $4,
				github_url = $5,
				linkedin_url = $6,
				resume_url = $7,
				city = $8
				WHERE id = $9
				RETURNING *
				`,
			values: [
				params.email,
				params.phone_number,
				params.headline,
				params.bio,
				params.github_url,
				params.linkedin_url,
				params.resume_url,
				params.city,
				params.id,
			],
		};
		return db
			.query(query)
			.then(result => console.log(result))
			.catch(err => err);
	};

	return {
		getUserByEmail,
		getDevs,
		getDevById,
		getProjectsByDevId,
		getJobApplicationsByDevId,
		getGigApplicationsByDevId,
		getAcceptedGigs,
		editProfile,
		// addDev,
		// getAcceptedJobApplications,
		// getAcceptedGigApplications,
	};
};
