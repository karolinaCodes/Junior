import './styles/PortfolioCard.scss';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
	Avatar,
	Grid,
	Button,
	Chip,
	List,
	ListItem,
	ListItemText,
	ListItemButton,
	IconButton,
	CardContent,
	CardActions,
	Collapse,
	Dialog,
	Box,
	useControlled,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import NewProjectPost from './NewProjectPost';

export default function ApplicationCard(props) {
	const {
		projectForm,
		setProjectForm,
		view,
		applicationChange,
		openModal,
		setOpenModal,
		setModalData,
		applications,
		setApplicationChange,
		app_id,
		job_title,
		description,
		salary,
		formatted_salary,
		date_posted,
		formatted_date,
		date_applied,
		formatted_date_applied,
		job_type,
		is_remote,
		employer_id,
		employer_email,
		company_name,
		employer_bio,
		employer_photo_url,
		deadline,
		photo_url,
		city,
		pay,
		formatted_pay,
		formatted_deadline,
		posting_location,
		job_posting_id,
		gig_posting_id,
		is_accepted,
		is_completed,
	} = props;

	const location = `${posting_location} (${is_remote ? 'Remote' : 'On-site'})`;
	const postingLink = job_posting_id
		? `/job/${job_posting_id}`
		: `/gig/${gig_posting_id}`;

	const [expanded, setExpanded] = useState(false);
	const [complete, setComplete] = useState(false);

	const navigate = useNavigate();

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	// For application expander (down arrow)
	const ExpandMore = styled(props => {
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
		console.log('posting id', gig_posting_id);
		setComplete(true);
		return axios
			.post(`../api/gig_applications/complete/${gig_posting_id}`)
			.then(res => {
				console.log(res.data);
				setApplicationChange(false);
			})
			.catch(err => console.log(err));
	};

	const createProject = () => {
		setProjectForm(prev => ({
			...prev,
			title: job_title,
			original_request: description,
		}));
		setOpenModal(true);
	};

	useEffect(() => {
		setModalData(
			<NewProjectPost
				projectForm={projectForm}
				setProjectForm={setProjectForm}
				openModal={openModal}
				setOpenModal={setOpenModal}
				setModalData={setModalData}
			/>
		);
	}, [projectForm]);

	const deleteApplication = id => {
		const type = job_posting_id ? 'job_applications' : 'gig_applications';
		console.log('delete', type, id);
		axios
			.post(`/api/${type}/delete`, { id })
			.then(res => {
				console.log('done');
				console.log('applications: ', applications);
				setApplicationChange(false);
			})
			.catch(err => console.log(err));
	};

	const askConfirmComplete = () => {
		// markComplete();
	};

	return (
		<>
			<CardContent>
				<Grid container direction='row' className='profile-info'>
					<Grid item className='profile-pic'>
						<Avatar
							id='profile-pic'
							alt={`Photo of ${company_name}`}
							src={employer_photo_url}
							sx={{ width: 150, height: 150 }}
							onClick={() => navigate(`/employer/${employer_id}`)}
						/>
						<h3 onClick={() => navigate(`/employer/${employer_id}`)}>
							{company_name}
						</h3>
					</Grid>
					<Grid
						item
						xs
						className='application-info'
						container
						direction='column'
						sx={{
							marginLeft: '1rem',
							alignItems: 'flex-end',
							textAlign: 'right',
						}}
					>
						<Grid item container direction='row'>
							<Grid item sx={{ h4: { mt: '0' }, h3: { mb: '0' } }}>
								<h3>{job_title}</h3>
								<h4>(Applied on: {formatted_date})</h4>
							</Grid>
							<Grid item>
								<Chip
									label={job_posting_id ? 'Job' : 'Gig'}
									color={job_posting_id ? 'primary' : 'success'}
									variant='outlined'
								/>
							</Grid>
							<Grid item sx={{ p: { mb: '0', mt: '0' } }}>
								{city && <p>{location}</p>}
								{salary && (
									<p>
										Salary: ${formatted_salary} ({job_type})
									</p>
								)}
								{pay && <p>Compensation: ${formatted_pay}</p>}
								{date_posted && <p>Date Posted: {formatted_date}</p>}
								{deadline && <p>Deadline: {formatted_deadline}</p>}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</CardContent>
			<CardActions disableSpacing>
				<Grid container direction='row'>
					<Grid item container xs>
						<Grid item>
							<Button
								variant='contained'
								color='primary'
								onClick={() => window.open(postingLink, '_self')}
								sx={{ mr: '1rem' }}
							>
								View Posting
							</Button>
						</Grid>
						<Grid item>
							{!is_accepted && (
								<Button
									variant='outlined'
									color='error'
									onClick={() => {
										setApplicationChange(true);
										deleteApplication(app_id);
									}}
								>
									Delete Application
								</Button>
							)}
							{is_accepted && !is_completed && !complete && (
								<Button
									variant='outlined'
									color='primary'
									onClick={() => {
										markComplete();
										console.log('complete ', postingLink);
									}}
								>
									Mark Completed
								</Button>
							)}
							{(is_completed || complete) && (
								<Button
									variant='outlined'
									color='primary'
									onClick={e => {
										createProject();
										console.log('CreateProj ', job_title, description);
									}}
								>
									Create Project
								</Button>
							)}
						</Grid>
					</Grid>
					<Grid item className='expand-text'>
						See Description
						<ExpandMore
							expand={expanded}
							onClick={handleExpandClick}
							aria-expanded={expanded}
							aria-label='show more'
						>
							<ExpandMoreIcon />
						</ExpandMore>
					</Grid>
				</Grid>
			</CardActions>
			<Collapse in={expanded} timeout='auto' unmountOnExit>
				<CardContent>
					<p className='description'>{description}</p>
				</CardContent>
			</Collapse>
		</>
	);
}
