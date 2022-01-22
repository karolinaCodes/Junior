const express = require('express');
const router = express.Router();

module.exports = ({
	getDevs,
	getDevById,
	getProjectsByDevId,
	getJobApplicationsByDevId,
	getGigApplicationsByDevId,
	getAcceptedGigs,
	editProfile,
}) => {
	/* GET list of all devs */
	router.get('/', (req, res) => {
		getDevs()
			.then(devs => res.json(devs))
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	// return data for single dev based on id (can retrieve from cookies)
	router.get('/:id', (req, res) => {
		getDevById(req.params.id)
			.then(dev => res.json(dev))
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	// get all projects for single dev, with dev info
	router.get('/:id/projects', (req, res) => {
		getProjectsByDevId(req.params.id)
			.then(projects => {
				res.json(projects);
			})
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	router.get('/:id/applications/job', (req, res) => {
		getJobApplicationsByDevId(req.params.id)
			.then(applications => {
				res.json(applications);
			})
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	/* GET accepted gig applications by junior_dev_id */
	router.get('/:id/accepted/gig', (req, res) => {
		getAcceptedGigs(req.params.id)
			.then(gig => res.json(gig))
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	router.get('/:id/applications/gig', (req, res) => {
		getGigApplicationsByDevId(req.params.id)
			.then(applications => {
				res.json(applications);
			})
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	//Update user profile
	router.post('/edit', (req, res) => {
		editProfile(req.params.id)
			.then(profile => res.json(profile))
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	return router;
};
