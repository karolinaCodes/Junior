import './styles/PortfolioCard.scss';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {Grid, Button, List, ListItem, ListItemText, ListItemButton, IconButton, CardContent, CardActions, Collapse, useControlled} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

export default function ApplicationCard(props) {
	const { job_title, description, salary, formatted_salary, date_posted, formatted_date, date_applied, formatted_date_applied, job_type, is_remote, employer_email, company_name, employer_bio, employer_photo_url, deadline, photo_url, city, pay, formatted_pay, formatted_deadline, posting_location, job_posting_id, gig_posting_id, is_accepted, is_completed } =	props;

	//Job or gig
	const { type } = 'gig';

	const location = `${posting_location} (${is_remote ? 'Remote' : 'On-site'})`;
	const postingLink = job_posting_id ? `/job/${job_posting_id}` : `/gig/${gig_posting_id}`;

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
//('api/gig_postings/complete/:id'
	const markComplete = () => {
		console.log('posting id',gig_posting_id);
		return axios
			.post(`../api/gig_applications/complete/${gig_posting_id}`)
			.then((res) => {
				console.log(res.data)
			})
			.catch(err => console.log(err))
	}

	const navigate = useNavigate();
	
	const createProject = () => {
		navigate('/newproject', { state: {title: job_title, description: description}})
	}

	/*
	junior_dev_id: currentUser.id,
	title: job_title,
	original_request: description,
	*/
	
	return (
		<>
			<CardContent>
				<Grid container direction='row' className='profile-info'>
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
				<Grid container direction='row'>
					<Grid item container xs>
						<Grid item>
							<Button
								color="success"
								onClick={() => window.open(postingLink, "_self")}
							>
								View Posting
							</Button>
						</Grid>
						<Grid item>
							{!is_accepted &&
								<Button
									color="error"
									onClick={() => console.log('delete ', type, postingLink)}
								>
									Delete Application
								</Button>
							}
							{(is_accepted && !is_completed) && 
								<Button
									color="error"
									onClick={() => {
										markComplete();
										console.log('complete ', postingLink);
									}}
								>
									Mark Completed
								</Button>
							}
							{is_completed  && 
								<Button
									color="error"
									onClick={() => {
										createProject();
										console.log('CreateProj ', job_title, description);
									}}
								>
									Create Project
								</Button>
							}

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
