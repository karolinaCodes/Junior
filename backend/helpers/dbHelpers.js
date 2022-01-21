module.exports = db => {
	// PROJECTS //
	const getProjectsByDevId = id => {
		const query = {
			text: `SELECT junior_devs.id as junior_dev_id, first_name, last_name, email,
        projects.id as project_id, title, description, thumbnail_photo_url, github_link, live_link
        FROM junior_devs
        INNER JOIN projects
        ON junior_devs.id = projects.junior_dev_id
        WHERE junior_dev_id= $1
        `,
			values: [id],
		};

		return db
			.query(query)
			.then(result => result.rows)
			.catch(err => err);
	};

	const getProjectById = id => {
		const query = {
			text: `SELECT * FROM projects WHERE id= $1`,
			values: [id],
		};

		return db
			.query(query)
			.then(result => result.rows[0])
			.catch(err => err);
	};

	const addProject = (
		junior_dev_id,
		title,
		description,
		thumbnail_photo_url,
		github_link,
		live_link
	) => {
		console.log('here');
		const query = {
			text: `INSERT INTO projects (junior_dev_id, title, description, thumbnail_photo_url, github_link, live_link) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
			values: [
				junior_dev_id,
				title,
				description,
				thumbnail_photo_url,
				github_link,
				live_link,
			],
		};
		return db
			.query(query)
			.then(result => result.rows[0])
			.catch(err => err);
	};

	// Jobs and Gigs Search //
	const getJobsAndGigsByQuery = queryString => {
		const q1 = {
			text: `SELECT employers.id as employer_id, company_name, email, bio, employers.photo_url as employer_photo_url, job_postings.* FROM employers JOIN job_postings ON employers.id = job_postings.employer_id WHERE job_title ILIKE '%${queryString}%' OR description ILIKE '%${queryString}%';`,
			// values: [queryString],
		};
		const q2 = {
			text: `SELECT employers.id as employer_id, company_name, email, bio, employers.photo_url as employer_photo_url, gig_postings.* FROM employers JOIN gig_postings ON employers.id = gig_postings.employer_id WHERE job_title ILIKE '%${queryString}%' OR description ILIKE '%${queryString}%';`,
			// values: [queryString],
		};
		// SELECT employers.id as employer_id, company_name, email, bio, employers.photo_url as employer_photo_url, job_postings.* FROM employers JOIN job_postings ON employers.id = job_postings.employer_id WHERE

		return db
			.query(q1)
			.then(result1 => {
				const jobs = result1.rows;
				// console.log('++++++++++++++++++++', jobs);
				return db.query(q2).then(result2 => {
					const gigs = result2.rows;
					// console.log('================', gigs);
					// console.log({jobs, gigs});
					return gigs.concat(jobs);
				});
			})
			.catch(err => err);
	};
	// getJobsAndGigsByQuery('act');

	const getJobsByCity = city => {
		const query = {
			text: `SELECT * FROM job_postings WHERE city=$1;`,
			values: [city],
		};

		return db
			.query(query)
			.then(result => {
				return result.rows;
				// const jobs = result.rows;
				// console.log('++++++++++++++++++++', jobs);
			})
			.catch(err => err);
	};
	// getJobsByCity('Saskatoon');

	const getJobsByType = type => {
		const query = {
			text: `SELECT * FROM job_postings WHERE job_type = $1;`,
			values: [type],
		};
		return db
			.query(query)
			.then(result => {
				return result.rows;
				// const jobs = result.rows;
				// console.log('================', jobs);
			})
			.catch(err => err);
	};
	// getJobsByType('Full-time');

	// SELECT employers.id as employer_id,
	//     company_name, email, bio, employers.photo_url as employer_photo_url,
	//     gig_postings.*
	//     FROM employers
	//     JOIN gig_postings ON employers.id = gig_postings.employer_id

	const getJobsByMulti = sqlQuery => {
		console.log(sqlQuery);
		let sqlQueryString = '';
		sqlQuery.toggle === 'jobs'
			? (sqlQueryString +=
					'SELECT employers.id as employer_id, company_name, email, bio, employers.photo_url as employer_photo_url, job_postings.* FROM employers JOIN job_postings ON employers.id = job_postings.employer_id WHERE')
			: (sqlQueryString +=
					'SELECT employers.id as employer_id, company_name, email, bio, employers.photo_url as employer_photo_url, gig_postings.* FROM employers JOIN gig_postings ON employers.id = gig_postings.employer_id WHERE');

		if (sqlQuery.queryString) {
			sqlQueryString += ` (job_title ILIKE '%${sqlQuery.queryString}%' OR description ILIKE '%${sqlQuery.queryString}%')`;
		}

		if (sqlQuery.city) {
			if (sqlQueryString.slice(-5) !== 'WHERE') {
				sqlQueryString += ' AND';
			}
			sqlQueryString += ` city ILIKE '${sqlQuery.city}'`;
		}

		if (sqlQuery.job_type) {
			if (sqlQueryString.slice(-5) !== 'WHERE') {
				sqlQueryString += ' AND';
			}
			sqlQueryString += ` job_type ILIKE '${sqlQuery.job_type}' `;
		}

		if (sqlQuery.salary_min) {
			if (sqlQueryString.slice(-5) !== 'WHERE') {
				sqlQueryString += ' AND';
			}
			sqlQueryString += ` (salary > ${sqlQuery.salary_min} AND salary < ${sqlQuery.salary_max})`;
		}

		if (sqlQueryString.slice(-5) === 'WHERE') {
			sqlQueryString.slice('WHERE');
		}

		sqlQueryString += ';';

		const query = {
			text: sqlQueryString,
		};
		console.log(query.text);
		return db
			.query(query)
			.then(result => {
				console.log(result.rows);
				return result.rows;
				// const jobs = result.rows;
				// console.log('================', jobs);
			})
			.catch(err => err);
	};
	//



	const getJobApplicationsByDevId = junior_dev_id => {
		const query = {
			text: `
        SELECT job_applications.*, job_postings.*,
        employers.email as employer_email, company_name, employers.bio as employer_bio, employers.photo_url as employer_photo_url,
        junior_devs.email as dev_email, first_name, last_name,phone_number, headline, junior_devs.bio as dev_bio, junior_devs.photo_url as dev_photo_url,
        trim(to_char(salary/100, '999,999,990')) as formatted_salary,
        to_char(date_posted,'FMMonth DD, YYYY') as formatted_date,
        to_char(date_applied,'FMMonth DD, YYYY') as formatted_date_applied
        FROM job_applications
        JOIN job_postings ON job_applications.job_posting_id = job_postings.id
        JOIN junior_devs ON job_applications.junior_dev_id = junior_devs.id
        JOIN employers ON job_postings.employer_id = employers.id
        WHERE job_applications.junior_dev_id = $1
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
        SELECT gig_applications.*, gig_postings.*,
        trim(to_char(pay/100, '999,999,990')) as formatted_pay,
        employers.email as employer_email, company_name, employers.bio as employer_bio, employers.photo_url as employer_photo_url,
        junior_devs.email as dev_email, first_name, last_name,phone_number, headline, junior_devs.bio as dev_bio, junior_devs.photo_url as dev_photo_url,
        to_char(date_posted,'FMMonth DD, YYYY') as formatted_date,
        to_char(deadline,'FMMonth DD, YYYY') as formatted_deadline,
        to_char(date_applied,'FMMonth DD, YYYY') as formatted_date_applied
        FROM gig_applications
        JOIN gig_postings ON gig_applications.gig_posting_id = gig_postings.id
        JOIN junior_devs ON gig_applications.junior_dev_id = junior_devs.id
        JOIN employers ON gig_postings.employer_id = employers.id
        WHERE gig_applications.junior_dev_id = $1
        `,
			values: [junior_dev_id],
		};

		return db
			.query(query)
			.then(result => result.rows)
			.catch(err => err);
	};

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

	return {
		getProjectsByDevId,
		getProjectById,
		addProject,
		getJobsAndGigsByQuery,
		getJobsByCity,
		getJobsByType,
		getJobsByMulti,
		getJobApplicationsByDevId,
		getGigApplicationsByDevId,
		getAcceptedJobApplications,
		getAcceptedGigApplications,
	};
};
