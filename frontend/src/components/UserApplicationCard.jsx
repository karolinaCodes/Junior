import './styles/PortfolioCard.scss';
import { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {Grid, Button, List, ListItem, ListItemText, ListItemButton, IconButton, CardContent, CardActions, Collapse} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ApplicationCard(props) {
	const { job_title, description, salary, formatted_salary, date_posted, formatted_date, date_applied, formatted_date_applied, job_type, is_remote, employer_email, company_name, employer_bio, employer_photo_url, deadline, photo_url, city, pay, formatted_pay, formatted_deadline, posting_location } =	props;

	const location = `${posting_location} (${is_remote ? 'Remote' : 'On-site'})`;

	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	// For application expander (down arrow)
	const ExpandMore = styled((props) => {
		const { expand, ...other } = props;
		return <IconButton {...other} />;
	})(({ theme, expand }) => ({
		transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	}));

	return (
		<>
			<CardContent>
				<Grid container direction='row' xs className='profile-info'>
					<Grid item className='profile-pic'>
						<img id="profile-pic"
							src={employer_photo_url}
							alt={`Photo of ${company_name}`}
						/>
							<h3>{company_name}</h3>
					</Grid>
					<Grid item xs={10} className='application-info' container direction='column' sx={{marginLeft: '1rem'}}>
						<Grid item>
							<h3>{job_title} (Applied on: {formatted_date})</h3>
						</Grid>
						<Grid item>
							{city && <p>{location}</p>}
							{salary && <p>Salary: ${formatted_salary} ({job_type})</p>}
							{pay && <p>Compensation: ${formatted_pay}</p>}
							{date_posted && <p>Date Posted: {formatted_date}</p>}
							{deadline && <p>Deadline: {formatted_deadline}</p>}
						</Grid>
					</Grid>
				</Grid>
			</CardContent>
			<CardActions disableSpacing>
				<Grid container direction='row' xs>
					<Grid item container xs>
						<Grid item>
							<Button color="success">
								View Posting
							</Button>
						</Grid>
						<Grid item>
							<Button color="error">
								Delete Application
							</Button>
						</Grid>
					</Grid>
					<Grid item className="expand-text">
						See Description 
						<ExpandMore
							expand={expanded}
							onClick={handleExpandClick}
							aria-expanded={expanded}
							aria-label="show more"
						>
							<ExpandMoreIcon />
						</ExpandMore>
					</Grid>
				</Grid>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
				<p className="description">{description}</p>
				</CardContent>
			</Collapse>
		</>
	);
}
