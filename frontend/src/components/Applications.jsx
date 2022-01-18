import './styles/PortfolioCard.scss';
import {Grid} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function ApplicationCard(props) {
	const { first_name, last_name, email, bio, photo_url, github_url, linkedIn_url, resume_url, location } =
		props;

	return (
		<Grid container direction='row'>
			<Grid item>
				<img src={photo_url} alt={`${first_name} ${last_name}`} height="150" />
			</Grid>
			<Grid container direction='row' sx={{flex: 1}}>
				<Grid item>
					<h3>{`${first_name} ${last_name}`}</h3>
				</Grid>
				<Grid container direction='row'>
					<Grid item>
						<p>{email}</p>
						<p>Github: {github_url}</p>
						<p>LinkedIn: {linkedIn_url}</p>
						<p>Resume: {resume_url}</p>
						<p><LocationOnIcon /> {location}</p>
					</Grid>
					<Grid item>
						<p>{bio}</p>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
