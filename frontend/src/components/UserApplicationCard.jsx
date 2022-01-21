import './styles/PortfolioCard.scss';
import {Grid} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function ApplicationCard(props) {
	const { job_title, description, salary, formatted_salary, date_posted, formatted_date, date_applied, formatted_date_applied, job_type, is_remote, employer_email, company_name, employer_bio, employer_photo_url, deadline, photo_url, application_date, city } =	props;
		
	const formattedDate = new Date(date_posted).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
	const formattedDeadline = new Date(deadline).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
	const formattedApplicationDate = new Date(date_applied).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	return (
		<Grid container direction='row' className='profile-info'>
			<Grid item className='profile-pic'>
				<img id="profile-pic"
					src={employer_photo_url}
					alt={`Photo of ${company_name}`}
				/>
				<p>{`Applied on: ${formattedApplicationDate}`}</p>
			</Grid>
			<Grid item className='application-info'>
				<h3>{job_title}</h3>
				<p>{company_name}</p>
				{city && <p><LocationOnIcon /> {city} ({is_remote ? 'Remote' : 'On-site'})</p>}
				<p>Salary: {salary}</p>
				<p>{date_posted && `Date Posted: ${formattedDate}`}</p>
				<p>{job_type ? job_type : `Deadline: ${formattedDeadline}`}</p>
			</Grid>
		</Grid>
	);
}
