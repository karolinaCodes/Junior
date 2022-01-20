import './styles/PortfolioCard.scss';
import {Grid, Button, Modal, Box, Paper, Card, CardActionArea, CardActions, CardMedia} from '@mui/material';

export default function JobPostingModal(props) {
	const { job_title, description, pay, date_posted, deadline, photo_url } =
		props;
	const datePostedFormatted = new Date(date_posted).toLocaleDateString();
	const deadlineFormatted = new Date(deadline).toLocaleDateString();
	return (
		<>
			<h1>{job_title}</h1>
			<h3>Compensation: ${pay / 100.00}</h3>
			<CardMedia
				component="img"
				image={photo_url}
				alt={job_title}
			/>
			<h3>Date Posted: {datePostedFormatted}</h3>
			<h3>Deadline: {deadlineFormatted}</h3>
			<p>{description}</p>
		</>
	);
};
