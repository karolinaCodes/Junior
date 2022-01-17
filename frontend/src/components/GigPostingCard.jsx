import './styles/PortfolioCard.scss';
import { Paper, Button } from '@mui/material';

export default function Profile(props) {
	const { job_title, description, pay, date_posted, deadline, photo_url } =
		props;
	const datePostedFormatted = new Date(date_posted).toLocaleDateString();
	const deadlineFormatted = new Date(deadline).toLocaleDateString();
	return (
		<>
			<Paper>
				<h1>{job_title}</h1>
				<h3>Compensation: ${pay / 100.00}</h3>
				<img src={photo_url}></img>
				<h3>Date Posted: {datePostedFormatted}</h3>
				<h3>Deadline: {deadlineFormatted}</h3>
				<p>{description}</p>
			</Paper>
			<Button>
				View Applicants
			</Button>
		</>
	);
}
