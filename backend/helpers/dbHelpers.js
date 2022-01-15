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

	const getEmployers = () => {
		const query = {
			text: 'SELECT * FROM employers',
		};

		return db
			.query(query)
			.then(result => result.rows)
			.catch(err => err);
	};

	const getDevByEmail = email => {
		const query = {
			text: `SELECT * FROM junior_devs WHERE email = $1`,
			values: [email],
		};

		return db
			.query(query)
			.then(result => result.rows[0])
			.catch(err => err);
	};

	const addDev = (
		first_name,
		last_name,
		email,
		password,
		bio,
		photo_url,
		github_url,
		linkedIn_url,
		resume_url,
		location
	) => {
		const query = {
			text: `INSERT INTO junior_devs (first_name, last_name, email, password, bio, photo_url, github_url, linkedIn_url, resume_url, location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
			values: [
				first_name,
				last_name,
				email,
				password,
				bio,
				photo_url,
				github_url,
				linkedIn_url,
				resume_url,
				location,
			],
		};

		return db
			.query(query)
			.then(result => result.rows[0])
			.catch(err => err);
	};

	const getDevProjects = () => {
		const query = {
			text: `SELECT junior_devs.id as junior_dev_id, first_name, last_name, email, projects.id as project_id, title, description, thumbnail_photo_url, github_link, live_link
      FROM junior_devs
      INNER JOIN projects
      ON junior_devs.id = projects.junior_dev_id`,
		};

		return db
			.query(query)
			.then(result => result.rows)
			.catch(err => err);
	};

	const getJobPostings = () => {
		const query = {
			text: 'SELECT * FROM job_postings',
		};

		return db
			.query(query)
			.then(result => result.rows)
			.catch(err => err);
	};

	const getJobPostingsByEmployerEmail = (email) => {
		const query = {
			text: `SELECT employers.id as employer_id, employers.email as email, job_postings.*
      FROM employers
      JOIN job_postings ON employers.id = job_postings.employer_id
			WHERE employers.email = $1`
		};

		return db
			.query(query)
			.then(result => result.rows)
			.catch(err => err);
	};

	return {
		getDevs,
		getDevByEmail,
		addDev,
		getDevProjects,
		getEmployers,
		getJobPostings,
		getJobPostingsByEmployerEmail,
	};
};
