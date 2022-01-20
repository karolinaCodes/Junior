import './styles/PortfolioModal.scss';
import {DialogTitle, Grid, Card} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function ApplicationCard(props) {
	const { first_name, last_name, email, bio, photo_url, github_url, linkedIn_url, resume_url, location, dev_photo_url } =
		props;

	return (
		<>
		<Grid item>
			<h1>{`${first_name} ${last_name}`}</h1>
		</Grid>
		<Grid container direction='row' className='application-info'>
			<Grid item className='profile-pic'>
				<img id="profile-pic"
					src={photo_url}
					alt={`Photo of ${first_name} ${last_name}`}
				/>
			</Grid>
			<Grid item xs={6} className='profile-info'>
				<p>{email}</p>
				<p>Github: {github_url}</p>
				<p>LinkedIn: {linkedIn_url}</p>
				<p>Resume: {resume_url}</p>
				<p><LocationOnIcon /> {location}</p>
			</Grid>
			</Grid>
			<Grid item xs={12}>
				<p>{bio}</p>
			</Grid>
		</>
	);
}
