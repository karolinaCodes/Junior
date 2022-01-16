import './styles/PortfolioCard.scss';
import { Paper } from '@mui/material';

export default function Profile(props) {
	const { job_title, description, city, salary_min, salary_max, job_type, is_remote, date_posted, is_open } =
		props;

	return (
		<Paper>
			<h1>{job_title}</h1>
			<h3>{city}</h3>
			<h3>${salary_min} - ${salary_max}</h3>
			<h3>{job_type}, Remote: {is_remote ? 'Yes' : 'No'}</h3>
			<h3>Date Posted: {date_posted}</h3>
			<h3>Accepting Applicants: {is_open ? 'Yes' : 'No'}</h3>
			<p>{description}</p>

		</Paper>
	);
}
