// DB queries for SEARCH FUNCTION //

module.exports = db => {
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

	return {
		getJobsAndGigsByQuery,
		getJobsByCity,
		getJobsByType,
		getJobsByMulti,
	};
};
