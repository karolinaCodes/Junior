// DB queries for GIG APPLICATIONS //

module.exports = db => {
	/* Retrieve all gig application data, gig posting data,
      employer email, company_name, bio, photo_url,
      junior_dev email, first_name, last_name, headline, bio, photo_url,
      github_url, linkedin_url, resume_url, location
  */

	const getGigApplicationById = id => {
		const query = {
			text: `SELECT gig_applications.id as app_id,
				gig_applications.*, gig_postings.*, 
        employers.email as employer_email, company_name, employers.bio as employer_bio, employers.photo_url as employer_photo_url,
        junior_devs.email as dev_email, first_name, last_name, phone_number, headline, junior_devs.bio as dev_bio, junior_devs.photo_url as dev_photo_url,
				city, CONCAT(junior_devs.city,', Canada') as dev_location
        trim(to_char(pay/100, '999,999,990')) as formatted_pay,
        to_char(date_posted,'FMMonth DD, YYYY') as formatted_date,
        to_char(deadline,'FMMonth DD, YYYY') as formatted_deadline,
        to_char(date_applied,'FMMonth DD, YYYY') as formatted_date_applied
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

	const addGigApplication = (gig_posting_id, junior_dev_id) => {
		const query = {
			text: `INSERT INTO gig_applications (
        gig_posting_id, junior_dev_id
        ) VALUES ($1, $2) RETURNING *`,
			values: [gig_posting_id, junior_dev_id],
		};

		return db
			.query(query)
			.then(result => result.rows[0])
			.catch(err => err);
	};

	const acceptGigApplication = gig_application_id => {
		const query = {
			text: `UPDATE gig_applications
      SET is_accepted = true
      WHERE id = $1`,
			values: [gig_application_id],
		};

		return db
			.query(query)
			.then(result => result.rows[0])
			.catch(err => err);
	};

	const completeGigApplication = gig_application_id => {
		const query = {
			text: `UPDATE gig_applications
      SET is_completed = true
      WHERE id = $1`,
			values: [gig_application_id],
		};

		return db
			.query(query)
			.then(result => result.rows[0])
			.catch(err => err);
	};

	return {
		getGigApplicationById,
		addGigApplication,
		acceptGigApplication,
		completeGigApplication,
	};
};
