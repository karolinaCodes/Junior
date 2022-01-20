import './styles/PortfolioCard.scss';
import {Grid} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Link} from 'react-router-dom';

export default function ApplicationCard(props) {
	// const { job_title, description, pay, date_posted, deadline, photo_url, employer_email, company_name, employer_bio, employer_photo_url } =	props;
	const { job_title, description, salary, date_posted, job_type, is_remote, employer_email, company_name, employer_bio, employer_photo_url } =	props;
		
	// <Link to='#'
	// onClick={() => {
	// 		window.location = `mailto: ${employer_email}`;
	// }}>
	// </Link>
	return (
		<Grid container direction='row' className='profile-info'>
			<Grid item className='profile-pic'>
				<img id="profile-pic"
					src={employer_photo_url}
					alt={`Photo of ${company_name}`}
				/>
			</Grid>
			<Grid item>
				<h3>{job_title}</h3>
				<p>{company_name}</p>
				<p><LocationOnIcon /> (Location) ({is_remote ? 'Remote' : 'On-site'})</p>
				<p>Salary: ${salary}</p>
				<p>{date_posted &&
					`Date Posted: ${new Date(date_posted).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})}`}</p>
				<p>{job_type}</p>
				<p>Applied on: (insert date)</p>
			</Grid>
		</Grid>
	);
}
