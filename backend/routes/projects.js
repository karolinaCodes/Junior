const express = require('express');
const router = express.Router();

module.exports = ({ getProjectById, addProject, deleteProjectById }) => {
	// GET single project by project id
	router.get('/:id', (req, res) => {
		getProjectById(req.params.id)
			.then(project => {
				res.json(project);
			})
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	router.post('/delete/:id', (req, res) => {
		deleteProjectById(req.params.id)
			.then(data => {
				res.json(data);
			})
			.catch(err => console.log(err));
	});

	router.post('/new', (req, res) => {
		const {
			junior_dev_id,
			title,
			description,
			thumbnail_photo_url,
			github_link,
			live_link,
		} = req.body;

		console.log(
			junior_dev_id,
			title,
			description,
			thumbnail_photo_url,
			github_link,
			live_link
		);

		addProject(
			junior_dev_id,
			title,
			description,
			thumbnail_photo_url,
			github_link,
			live_link
		)
			.then(addedProject => {
				res.json(addedProject);
			})
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	return router;
};
