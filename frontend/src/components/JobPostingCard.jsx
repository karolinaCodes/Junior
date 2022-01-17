import './styles/PortfolioCard.scss';
import { Typography } from '@mui/material';

export default function Profile(props) {
	const { job_title, description, city, salary_min, salary_max, job_type, is_remote, date_posted, is_open } =
		props;
	const datePostedFormatted = new Date(date_posted).toLocaleDateString();

	return (
		<Typography zeroMinWidth>
			<h1>{job_title}</h1>
			<strong><p>{city}</p></strong>
			<strong><p>${salary_min} - ${salary_max}</p></strong>
			<strong><p>{job_type}, Remote: {is_remote ? 'Yes' : 'No'}</p></strong>
			<strong><p>Date Posted: {datePostedFormatted}</p></strong>
			<strong><p>Accepting Applicants: {is_open ? 'Yes' : 'No'}</p></strong>
			<p>{description}</p>
		</Typography>
	);
}
