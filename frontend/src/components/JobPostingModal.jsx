import { useState } from 'react';
import './styles/PortfolioCard.scss';
import { Paper, Button, Modal, Box } from '@mui/material';

export default function JobPostingModal(props) {
	const { job_title, description, city, salary_min, salary_max, job_type, is_remote, date_posted, is_open } =
		props;
	const datePostedFormatted = new Date(date_posted).toLocaleDateString();

	return (

		
		<>
			<h1>{job_title}</h1>
			<h3>{city}</h3>
			<h3>${salary_min} - ${salary_max}</h3>
			<h3>{job_type}, Remote: {is_remote ? 'Yes' : 'No'}</h3>
			<h3>Date Posted: {datePostedFormatted}</h3>
			<h3>Accepting Applicants: {is_open ? 'Yes' : 'No'}</h3>
			<p>{description}</p>
		</>
	);
};
