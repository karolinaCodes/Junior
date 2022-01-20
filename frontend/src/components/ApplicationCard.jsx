import './styles/PortfolioCard.scss';
import {Grid, Button} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function ApplicationCard(props) {
	const { first_name, last_name, email, bio, photo_url, github_url, linkedIn_url, resume_url, location, dev_photo_url, application_date } =
		props;
		
	const formattedApplicationDate = new Date(application_date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
	return (
		<Grid container direction='row'>
			<Grid item className='profile-pic'>
				<img id="profile-pic"
					src={photo_url}
					alt={`Photo of ${first_name} ${last_name}`}
				/>
				<p>{`Applied on: ${formattedApplicationDate}`}</p>
			</Grid>
			<Grid item container className='application-info' direction='column'>
				<Grid item>
					<h3>{`${first_name} ${last_name}`}</h3>
				</Grid>
				<Grid item>
					<Button
						onClick={() => window.open(`mailto:${email}`, '_self')}
						>
						{email}
					</Button>
				</Grid>
				<Grid item>
					<Button
						onClick={() => window.open(github_url, '_self')}
					>
						GitHub
					</Button>
				</Grid>
				<Grid item>
					<Button
						onClick={() => window.open(linkedIn_url, '_self')}
					>
						LinkedIn
					</Button>
				</Grid>
				<Grid item>
					<Button
						onClick={() => window.open(resume_url, '_self')}
					>
						Resume
					</Button>
				</Grid>
				<Grid item>
					<p><LocationOnIcon /> {location}</p>
				</Grid>
				{/* <Grid container direction='column' className='profile-info'>
					<Grid item>
						<p>{bio}</p>
					</Grid>
				</Grid> */}
			</Grid>
		</Grid>
		
	);
}
