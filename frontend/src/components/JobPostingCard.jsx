import './styles/PortfolioCard.scss';
import {CardContent, CardActionArea} from '@mui/material';

export default function Profile(props) {
	const { job_title, description, city, salary_min, salary_max, job_type, is_remote, date_posted, is_open } =
		props;
	const type = props.type;

	const datePostedFormatted = new Date(date_posted).toLocaleDateString();

	return (
		<CardContent>
			<h1>{job_title}</h1>
			<p>{city}</p>
			<p>${salary_min} - ${salary_max}</p>
			<p>{job_type}, Remote: {is_remote ? 'Yes' : 'No'}</p>
			<p>Date Posted: {datePostedFormatted}</p>
			<p>Accepting Applicants: {is_open ? 'Yes' : 'No'}</p>
			<p>{description}</p>
		</CardContent>
	);
}
