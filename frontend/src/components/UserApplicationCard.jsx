import './styles/PortfolioCard.scss';
import {Grid} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function ApplicationCard(props) {
	// const { job_title, description, pay, date_posted, deadline, photo_url, employer_email, company_name, employer_bio, employer_photo_url } =	props;
	const { job_title, description, salary, date_posted, job_type, is_remote, employer_email, company_name, employer_bio, employer_photo_url } =	props;
		
	return (
		<Grid item container direction='row' columnSpacing={3}>
			<Grid item className='profile-pic'>
				<img id="profile-pic"
					src={employer_photo_url}
					alt={`Photo of ${company_name}`}
				/>
			</Grid>
			<Grid item sm container direction='column'>
				<Grid item>
					<h3>{`${company_name} (${employer_email})`}</h3>
				</Grid>
				<Grid container direction='row' className='profile-info'>
					<Grid item>
						<p>{salary}</p>
						<p>{date_posted &&
                          `Date Posted: ${new Date(date_posted).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}`}</p>
						<p>{job_type}</p>
						<p>{is_remote}</p>
						<p><LocationOnIcon /> </p>
					</Grid>
					<Grid item>
						<p>{description}</p>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
		
	);
}
