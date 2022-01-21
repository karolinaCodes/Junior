import './styles/PortfolioCard.scss';
import {Grid} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function ApplicationCard(props) {
	const { job_title, description, salary, formatted_salary, date_posted, formatted_date, date_applied, formatted_date_applied, job_type, is_remote, employer_email, company_name, employer_bio, employer_photo_url, deadline, photo_url, city, pay, formatted_pay, formatted_deadline } =	props;
	const location = `${city} (${is_remote ? 'Remote' : 'On-site'})`;

	return (
		<Grid container direction='row' className='profile-info'>
			<Grid item className='profile-pic'>
				<img id="profile-pic"
					src={employer_photo_url}
					alt={`Photo of ${company_name}`}
				/>
				<p>Applied on: <br />{formatted_date}</p>
			</Grid>
			<Grid item className='application-info'>
				<h3>{job_title}</h3>
				<p>{company_name}</p>
				{city && <p>{location}</p>}
				{salary && <p>Salary: ${formatted_salary}</p>}
				{pay && <p>Compensation: ${formatted_pay}</p>}
				<p>{date_posted && `Date Posted: ${formatted_date}`}</p>
				<p>{job_type ? job_type : `Deadline: ${formatted_deadline}`}</p>
			</Grid>
		</Grid>
	);
}
