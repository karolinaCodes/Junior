module.exports = db => {
	// DEVS //
	const getDevs = () => {
		const query = {
			text: 'SELECT * FROM junior_devs',
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

	//

	// EMPLOYERS //
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
			.then(result => result.rows)
			.catch(err => err);
	};

	//

	// PROJECTS //
	const getProjectsByDevId = id => {
		const query = {
			text: `SELECT junior_devs.id as junior_dev_id, first_name, last_name, email, projects.id as project_id, title, description, thumbnail_photo_url, github_link, live_link
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
			.then(result => result.rows)
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
		const query = {
			text: `INSERT INTO projects (junior_dev_id, title, description, thumbnail_photo_url, github_link, live_link) VALUES ($1, $2, $3, $4, $5, $6,) RETURNING *`,
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
			.then(result => result.rows)
			.catch(err => err);
	};
	//

	// JOB POSTINGS //

	const getJobPostings = () => {
		const query = {
			text: `SELECT employers.id as employer_id, 
      company_name, email, bio, photo_url, 
      job_postings.*
      FROM employers
      JOIN job_postings ON employers.id = job_postings.employer_id`,
		};

		return db
			.query(query)
			.then(result => result.rows)
			.catch(err => err);
	};

	const getJobPostingsByEmployerId = id => {
		const query = {
			text: `SELECT employers.id as employer_id, 
        company_name, email, bio, employers.photo_url as employer_photo_url, 
        job_postings.*
        FROM employers
        JOIN job_postings ON employers.id = job_postings.employer_id
        WHERE employers.id = $1`,
			values: [id],
		};

		return db
			.query(query)
			.then(result => result.rows[0])
			.catch(err => err);
	};

	const getJobById = id => {
		const query = {
			text: `SELECT employers.id as employer_id, 
        company_name, email, bio, employers.photo_url as employer_photo_url, 
        job_postings.*
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
		salary_min,
		salary_max,
		type,
		is_remote,
		date_posted,
		is_open
	) => {
		const query = {
			text: `INSERT INTO job_postings (
        employer_id,
        job_title,
        description,
        city,
        salary_min,
        salary_max,
        type,
        is_remote,
        date_posted,
        is_open
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
        ) RETURNING *`,
			values: [
				employer_id,
				job_title,
				description,
				city,
				salary_min,
				salary_max,
				type,
				is_remote,
				date_posted,
				is_open,
			],
		};

		return db
			.query(query)
			.then(result => result.rows[0])
			.catch(err => err);
	};

	// GIG POSTING //

	const getGigPostings = () => {
		const query = {
			text: `SELECT employers.id as employer_id, 
        company_name, email, bio, employers.photo_url as employer_photo_url, 
        gig_postings.*
        FROM employers
        JOIN gig_postings ON employers.id = gig_postings.employer_id`,
		};

		return db
			.query(query)
			.then(result => result.rows)
			.catch(err => err);
	};

	const getGigPostingsByEmployerId = id => {
		const query = {
			text: `SSELECT employers.id as employer_id, 
        company_name, email, bio, employers.photo_url as employer_photo_url, 
        gig_postings.*
        FROM employers
        JOIN gig_postings ON employers.id = gig_postings.employer_id
        WHERE employers.id = $1`,
			values: [id],
		};

		return db
			.query(query)
			.then(result => result.rows[0])
			.catch(err => err);
	};

	const getGigById = id => {
		const query = {
			text: `SELECT employers.id as employer_id, 
        company_name, email, bio, employers.photo_url as employer_photo_url, 
        gig_postings.*
        FROM employers
        JOIN gig_postings ON employers.id = gig_postings.employer_id
        WHERE gig_postings.id = $1`,
			values: [id],
		};

		return db
			.query(query)
			.then(result => result.rows[0])
			.catch(err => err);
	};

	const addGigPosting = (
		employer_id,
		gig_name,
		description,
		pay,
		date_posted,
		deadline,
		photo_url
	) => {
		const query = {
			text: `INSERT INTO gig_postings (
        employer_id,
        gig_name,
        description,
        pay,
        date_posted,
        deadline,
        photo_url
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7
        ) RETURNING *`,
      values: [
        employer_id,
        gig_name,
        description,
        pay,
        date_posted,
        deadline,
        photo_url,
      ],
    };

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };
  //

  // Jobs and Gigs Search //
  const getJobsAndGigsByQuery = queryString => {
    const q1 = {
      text: `SELECT * FROM job_postings WHERE job_title LIKE '%${queryString}%';`,
      // values: [queryString],
    };
    const q2 = {
      text: `SELECT * FROM gig_postings WHERE job_title LIKE '%${queryString}%';`,
      // values: [queryString],
    };

    return db
      .query(q1)
      .then(result1 => {
        const jobs = result1.rows;
        // console.log('++++++++++++++++++++', jobs);
        return db.query(q2).then(result2 => {
          const gigs = result2.rows;
          // console.log('================', gigs);
          // console.log({jobs, gigs});
          return {jobs, gigs};
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
        return result.rows[0];
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
  //

// Job Applications //
/* Retrieve all job application data, job posting data,
    employer email, company_name, bio, photo_url,
    junior_dev email, first_name, last_name, bio, photo_url,
    github_url, linkedIn_url, resume_url, location
*/

    const getJobApplicationById = id => {
    const query = {
      text: `SELECT job_applications.*, job_postings.*, 
        employers.email as employer_email, company_name, employers.bio as employer_bio, employers.photo_url as employer_photo_url,
        junior_devs.email as dev_email, first_name, last_name, junior_devs.bio as dev_bio, junior_devs.photo_url as dev_photo_url
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

  const getApplicationByJobPostingId = id => {
    const query = {
      text: `SELECT job_applications.*, job_postings.*
        FROM job_applications
        JOIN job_postings ON job_applications.job_posting_id = job_postings.id
        JOIN employers ON job_postings.employer_id = employers.id
        JOIN junior_devs ON job_applications.junior_dev_id = junior_devs.id
        WHERE job_applications.job_posting_id = $1`,
      values: [id],
    };

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  /* Retrieve all gig application data, gig posting data,
      employer email, company_name, bio, photo_url,
      junior_dev email, first_name, last_name, bio, photo_url,
      github_url, linkedIn_url, resume_url, location
  */

  const getGigApplicationById = id => {
    const query = {
      text: `SELECT gig_applications.*, gig_postings.*, 
        employers.email as employer_email, company_name, employers.bio as employer_bio, employers.photo_url as employer_photo_url,
        junior_devs.email as dev_email, first_name, last_name, junior_devs.bio as dev_bio, junior_devs.photo_url as dev_photo_url
        FROM gig_applications
        JOIN gig_postings ON gig_applications.gig_posting_id = gig_postings.id
        JOIN employers ON gig_postings.employer_id = employers.id
        JOIN junior_devs ON gig_applications.junior_dev_id = junior_devs.id
        WHERE gig_applications.id = $1`,
      values: [id],
    };

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  const getApplicationByGigPostingId = id => {
    const query = {
      text: `SELECT gig_applications.*, gig_postings.*, 
        employers.email as employer_email, company_name, employers.bio as employer_bio, employers.photo_url as employer_photo_url,
        junior_devs.email as dev_email, first_name, last_name, junior_devs.bio as dev_bio, junior_devs.photo_url as dev_photo_url
        FROM gig_applications
        JOIN gig_postings ON gig_applications.gig_posting_id = gig_postings.id
        JOIN employers ON gig_postings.employer_id = employers.id
        JOIN junior_devs ON gig_applications.junior_dev_id = junior_devs.id
        WHERE gig_applications.gig_posting_id = $1`,
      values: [id],
    };

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  return {
    getDevs,
    getDevByEmail,
    getDevById,
    addDev,
    getProjectsByDevId,
    getProjectById,
    getEmployers,
    getEmployerById,
    getJobPostings,
    getJobPostingsByEmployerId,
    getJobById,
    addJobPosting,
    addProject,
    getGigPostings,
    getGigById,
    getGigPostingsByEmployerId,
    addGigPosting,
    getJobsAndGigsByQuery,
    getJobsByCity,
    getJobsByType,
    getJobApplicationById,
    getApplicationByJobPostingId,
    getGigApplicationById,
    getApplicationByGigPostingId,
  };
};
