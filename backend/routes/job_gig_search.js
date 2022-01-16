const express = require('express');
const router = express.Router();

module.exports = ({ getJobsAndGigsByQuery, getJobsByCity, getJobsByType }) => {
	/* GET list of job and gigs by query */
	router.get('/', (req, res) => {
		console.log('req body in Route', req.body);
		getJobsAndGigsByQuery(req.body.query)
			.then(job => res.json(job))
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	// /* GET list of job and gigs by city */
	// router.get('/city', (req, res) => {
	// 	getJobsByCity(req.body.city)
	// 		.then(job => res.json(job))
	// 		.catch(err =>
	// 			res.json({
	// 				error: err.message,
	// 			})
	// 		);
	// });

	// /* GET list of job and gigs by type */
	// router.get('/type', (req, res) => {
	// 	getJobsByType(req.body.type)
	// 		.then(job => res.json(job))
	// 		.catch(err =>
	// 			res.json({
	// 				error: err.message,
	// 			})
	// 		);
	// });

	return router;
};
