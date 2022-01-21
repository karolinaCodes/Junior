import './styles/PortfolioCard.scss';
import {Grid, List, ListItem, ListItemText, ListItemButton} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function ApplicationCard(props) {
	const { first_name, last_name, email, bio, photo_url, github_url, linkedIn_url, resume_url, location, dev_photo_url, date_applied, formatted_date_applied } =
		props;

	return (
		<Grid container direction='row'>
			<Grid item className='profile-pic'>
				<img id="profile-pic"
					src={photo_url}
					alt={`Photo of ${first_name} ${last_name}`}
				/>
				<p>{`Applied on: ${formatted_date_applied}`}</p>
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
								<ListItem disablePadding
									onClick={() => window.open(`mailto:${email}`, '_self')}
									>
									<ListItemText primary={email} />
								</ListItem>
							</ListItemButton>
							<ListItemButton>
								<ListItem disablePadding
									onClick={() => window.open(github_url, '_self')}
								>
									<ListItemText primary='GitHub' />
								</ListItem>
							</ListItemButton>
							<ListItemButton>
							<ListItem disablePadding
								onClick={() => window.open(linkedIn_url, '_self')}
							>
								<ListItemText primary='LinkedIn' />
							</ListItem>
							</ListItemButton>
							<ListItemButton>
								<ListItem disablePadding
									onClick={() => window.open(resume_url, '_self')}
								>
									<ListItemText primary='Resume' />
								</ListItem>
							</ListItemButton>
						</List>
					</Grid>
					<Grid item xs='auto' className='profile-bio'>
						<p>{bio}</p>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
