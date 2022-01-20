import './styles/PortfolioModal.scss';
import {Grid, List, ListItem, ListItemText, ListItemButton} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Link} from 'react-router-dom';

export default function ApplicationCard(props) {
	const { job_title, description, salary, date_posted, job_type, is_remote, employer_email, company_name, employer_bio, employer_photo_url, deadline, photo_url, application_date, city } =	props;
		
	const formattedDate = `Date Posted: ${new Date(date_posted).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})}`;
	const formattedTypeOrDeadline = job_type ? job_type : `Deadline: ${new Date(deadline).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})}`;
	const formattedApplicationDate = `Applied on: ${new Date(application_date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})}`;
	const location = `${city} ${is_remote ? 'Remote' : 'On-site'}`;
	return (
		<>
			<Grid item>
				<h1>{job_title}</h1>
			</Grid>
			<Grid container direction='row' className='profile-info'>
				<Grid item className='profile-pic'>
						<img id="profile-pic"
							src={employer_photo_url}
							alt={`Photo of ${company_name}`}
						/>
					<p>{formattedApplicationDate}</p>
				</Grid>
				<Grid item className='application-info'>
					<List>
						<ListItemButton>
							<ListItem disablePadding
								onClick={() => window.open(`mailto:${employer_email}`, '_self')}
							>
								<ListItemText primary={`${company_name} (${employer_email})`} />
							</ListItem>
						</ListItemButton>
						{city && <ListItemButton>
							<ListItem disablePadding>
								<ListItemText primary={location} />
							</ListItem>
						</ListItemButton>}
						<ListItemButton>
							<ListItem disablePadding>
								<ListItemText primary={`Salary: ${salary}`} />
							</ListItem>
						</ListItemButton>
						{date_posted && <ListItemButton>
							<ListItem disablePadding>
								<ListItemText primary={formattedDate} />
							</ListItem>
						</ListItemButton>}
						<ListItem>
							<ListItemText primary={formattedTypeOrDeadline} />
						</ListItem>
					</List>
				</Grid>
			</Grid>
		</>
	);
}
