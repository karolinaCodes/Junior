import './styles/PortfolioCard.scss';
import { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {Grid, Button, List, ListItem, ListItemText, ListItemButton, IconButton, CardContent, CardActions, Collapse} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

export default function ApplicationCard(props) {
	const { first_name, last_name, phone_number, headline, city, email, bio, photo_url, github_url, linkedIn_url, resume_url, location, dev_photo_url, date_applied, formatted_date_applied, formatted_date, dev_location, id } =
		props;
		
	//Check if job or gig application
	const postType = props.type;

	const [expanded, setExpanded] = useState(false);
	const [accepted, setAccepted] = useState(false);
		
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const acceptApplication = (postingId, postType) => {
		console.log('accept ' + postingId);
		if (postType === 'job') {
			axios
			.post(`../../../api/job_applications/accept/${postingId}`,{ 
				job_application_id: postingId,
			})
			.then(res => {
				console.log(res.data);
				console.log('acceptApplication job');
				setAccepted(res.data);
				return res.data;
			})
			.catch(err => {
				console.log(err);
			})
		} else if (postType === 'gig') {
			axios
			.post(`../../../api/gig_applications/accept/${postingId}`, {
				gig_application_id: postingId,
			})
			.then(res => {
				console.log(res.data);
				console.log('acceptApplication gig');
				setAccepted(res.data);
			})
			.catch(err => {
				console.log(err);
			})
		};
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
				<Grid container direction='row' xs className="stretch">
					<Grid item xs='auto' className='profile-pic'>
						<img id="profile-pic"
							src={dev_photo_url}
							alt={`Photo of ${first_name} ${last_name}`}
						/>
					</Grid>
					<Grid item container xs={10} direction='column'>
						<Grid item>
							<h3>{`${first_name} ${last_name} (${headline})`}</h3>
							<p>Applied on: {formatted_date}</p>
						</Grid>
						<Grid item container direction='row' sx={{justifyContent: 'space-between'}}>
							<Grid item xs={4}>
								{phone_number}
							</Grid>
							<Grid item xs={4}>
								{email}
							</Grid>
							<Grid item xs={4}>
								{dev_location}
							</Grid>
							<Grid item xs={4}
								onClick={() => window.open(github_url, '_self')}
							>
								Github: {github_url ? github_url : 'N/A'}
							</Grid>
							<Grid item xs={4}
								onClick={() => window.open(linkedIn_url, '_self')}
							>
								LinkedIn: {linkedIn_url ? linkedIn_url : 'N/A'}
							</Grid>
							<Grid item xs={4}
								onClick={() => window.open(resume_url, '_self')}
							>
								Resume: {resume_url ? resume_url : 'N/A'}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</CardContent>
			<CardActions disableSpacing>
				<Grid container direction='row' xs>
					<Grid item container xs>
						<Grid item>
							<Button
								color="success"
								onClick={() => {
									acceptApplication(id, postType)
									console.log(id, postType);
								}}
							>
								Accept
							</Button>
						</Grid>
						<Grid item>
							<Button 
								color="error"
								onClick={() => {
									// declineApplication(id, postType);
									console.log('decline', id, postType);
								}}
							>
								Decline
							</Button>
						</Grid>
					</Grid>
					<Grid item className="expand-text">
						See More 
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
					<p className="description">{bio}</p>
				</CardContent>
			</Collapse>
		</>
	);
}
