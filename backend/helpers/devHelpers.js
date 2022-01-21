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

	// For sign up- stretch
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
		linkedIn_url,
		resume_url,
		location
	) => {
		const query = {
			text: `INSERT INTO junior_devs (first_name, last_name, email, password, phone_number, headline, bio, photo_url, github_url, linkedIn_url, resume_url, location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
			values: [
				first_name,
				last_name,
				email,
				password,
				phone_number,
				headline,
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
	}
  
  return {
		getDevs,
		getUserByEmail,
		getDevById,
		addDev,
  };
};