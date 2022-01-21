const express = require('express');
const router = express.Router();

module.exports = ({
	getJobApplicationById,
	addJobApplication,
	acceptJobApplication,
}) => {
	/* GET a job application by job_applications.id */
	router.get('/:id', (req, res) => {
		getJobApplicationById(req.params.id)
			.then(application => res.json(application))
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	/* Accept a gig application */
	router.post('/accept/:id', (req, res) => {
		acceptJobApplication(req.params.id)
			.then(application => res.json(application))
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	/* POST a new job application */
	router.post('/new', (req, res) => {
		const { job_posting_id, junior_dev_id } = req.body;
		addJobApplication(job_posting_id, junior_dev_id)
			.then(newJobApplication => res.json(newJobApplication))
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	return router;
};
