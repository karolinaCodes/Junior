import './styles/PortfolioCard.scss';
import {Grid, List, ListItem, ListItemText, ListItemButton} from '@mui/material';
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
				<p><LocationOnIcon /> {location}</p>
			</Grid>
			<Grid item className='application-name' container xs='auto' direction='column'>
				<Grid item>
					<h3>{`${first_name} ${last_name}`}</h3>
				</Grid>
				<Grid item container xs='auto' direction='row'>
					<Grid item>
						<List>
							<ListItemButton>
								<ListItem disablePadding>
									<ListItemText primary={email} />
								</ListItem>
							</ListItemButton>
							<ListItemButton>
								<ListItem disablePadding>
									<ListItemText primary='GitHub' />
								</ListItem>
							</ListItemButton>
							<ListItemButton>
							<ListItem disablePadding>
								<ListItemText primary='LinkedIn' />
							</ListItem>
							</ListItemButton>
							<ListItemButton>
								<ListItem disablePadding>
									<ListItemText primary='Resume' />
								</ListItem>
							</ListItemButton>
						</List>
					</Grid>
					<Grid item xs='auto' direction='column' className='profile-bio'>
						<p>{bio}</p>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
