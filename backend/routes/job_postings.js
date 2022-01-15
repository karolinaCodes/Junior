const express = require('express');
const router = express.Router();


module.exports = ({ getJobPostings }) => {
	/* GET list of jobs */
	router.get('/', (req, res) => {
		getJobPostings()
			.then(job => res.json(job))
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});


	return router;
};
