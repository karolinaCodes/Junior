import './styles/PortfolioCard.scss';
import { Typography } from '@mui/material';

export default function Profile(props) {
	const { job_title, description, pay, date_posted, deadline, photo_url } =
		props;
	const datePostedFormatted = new Date(date_posted).toLocaleDateString();
	const deadlineFormatted = new Date(deadline).toLocaleDateString();
	return (
		<Typography zeroMinWidth>
			<h1><p>{job_title}</p></h1>
			<strong><p>Compensation: ${pay / 100.00}</p></strong>
			<img src={photo_url} alt={job_title}></img>
			<strong><p>Date Posted: {datePostedFormatted}</p></strong>
			<strong><p>Deadline: {deadlineFormatted}</p></strong>
			<strong><p>{description}</p></strong>
		</Typography>
	);
}
