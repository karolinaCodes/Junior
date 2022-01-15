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

  // const getJobPostings = () => {
  // 	const query = {
  // 		text: 'SELECT * FROM job_postings',
  // 	};

  // 	return db
  // 		.query(query)
  // 		.then(result => result.rows)
  // 		.catch(err => err);
  // };

  const getJobPostings = () => {
    const query = {
      text: `SELECT employers.id as employer_id, employers.email as email, job_postings.*
      FROM employers
      JOIN job_postings ON employers.id = job_postings.employer_id`,
    };

    return db
      .query(query)
      .then(result => result.rows)
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
      text: `INSERT INTO job_postings (employer_id,job_title,description,city,salary_min,salary_max,type,is_remote,date_posted,is_open) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
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

  //

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
    addJobPosting,
    addProject,
  };
};
