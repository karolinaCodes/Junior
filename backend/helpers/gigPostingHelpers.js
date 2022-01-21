// DB queries for GIG POSTINGS //

module.exports = db => {
	const getGigPostings = () => {
		const query = {
			text: `SELECT employers.id as employer_id, 
        company_name, email, bio, employers.photo_url as employer_photo_url, 
        gig_postings.id, trim(to_char(pay/100, '999,999,990')) as formatted_pay,
        to_char(date_posted,'FMMonth DD, YYYY') as formatted_date,
        to_char(deadline,'FMMonth DD, YYYY') as formatted_deadline
        FROM employers
        JOIN gig_postings ON employers.id = gig_postings.employer_id`,
		};

		return db
			.query(query)
			.then(result => result.rows)
			.catch(err => err);
	};

	const getGigById = id => {
		const query = {
			text: `SELECT employers.id as employer_id, 
        company_name, email, bio, employers.photo_url as employer_photo_url, 
        gig_postings.*, trim(to_char(pay/100, '999,999,990')) as formatted_pay,
        to_char(date_posted,'FMMonth DD, YYYY') as formatted_date,
        to_char(deadline,'FMMonth DD, YYYY') as formatted_deadline
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

	const addGigPosting = (employer_id, gig_name, description, pay, deadline) => {
		console.log(
			'addGigPosting',
			employer_id,
			gig_name,
			description,
			pay,
			deadline
		);
		const query = {
			text: `INSERT INTO gig_postings (
        employer_id,
        job_title,
        description,
        pay,
        deadline
        ) VALUES (
          $1, $2, $3, $4, $5
        ) RETURNING *`,
			values: [employer_id, gig_name, description, pay, deadline],
		};

		return db
			.query(query)
			.then(result => result.rows[0])
			.catch(err => err);
	};

	const getApplicationsByGigPostingId = id => {
		const query = {
			text: `SELECT gig_applications.*, gig_postings.*, 
        employers.email as employer_email, company_name, employers.bio as employer_bio, employers.photo_url as employer_photo_url,
        junior_devs.email as dev_email, first_name, last_name,phone_number, headline, junior_devs.bio as dev_bio, junior_devs.photo_url as dev_photo_url,
        trim(to_char(pay/100, '999,999,990')) as formatted_pay,
        to_char(date_posted,'FMMonth DD, YYYY') as formatted_date,
        to_char(deadline,'FMMonth DD, YYYY') as formatted_deadline,
        to_char(date_applied,'FMMonth DD, YYYY') as formatted_date_applied
        FROM gig_applications
        JOIN gig_postings ON gig_applications.gig_posting_id = gig_postings.id
        JOIN employers ON gig_postings.employer_id = employers.id
        JOIN junior_devs ON gig_applications.junior_dev_id = junior_devs.id
        WHERE gig_applications.gig_posting_id = $1`,
			values: [id],
		};

		return db
			.query(query)
			.then(result => result.rows)
			.catch(err => err);
	};
  return {
		getGigPostings,
		getGigById,
		addGigPosting,
    getApplicationsByGigPostingId
  };
};