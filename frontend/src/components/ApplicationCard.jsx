import './styles/PortfolioCard.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
	Grid,
	Button,
	IconButton,
	CardContent,
	CardActions,
	Collapse,
	Avatar,
} from '@mui/material';
import {
	FolderIcon,
	FolderOpen,
	GitHub,
	LinkedIn,
	EmailOutlined,
	FmdGoodOutlined,
	CancelOutlined,
	LocalPhone,
} from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

export default function ApplicationCard(props) {
	const {
		app_id,
		first_name,
		last_name,
		phone_number,
		headline,
		email,
		bio,
		github_url,
		linkedin_url,
		resume_url,
		dev_photo_url,
		formatted_date,
		dev_location,
		junior_dev_id,
		is_accepted,
	} = props;
	//Check if job or gig application
	const postType = props.type;

	const navigate = useNavigate();

	const [expanded, setExpanded] = useState(false);
	const [accepted, setAccepted] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const acceptApplication = (postingId, postType) => {
		console.log('accept ' + postingId);
		if (postType === 'job') {
			axios
				.post(`../../../api/job_applications/accept/${postingId}`, {
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
				});
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
				});
		}
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

	return (
		<>
			<CardContent>
				<Grid
					container
					xs={12}
					direction='row'
					sx={{ width: '100%' }}
					className='profile-info'
				>
					<Grid item className='profile-pic'>
						<Avatar
							id='profile-pic'
							src={dev_photo_url}
							alt={`Photo of ${first_name} ${last_name}`}
							sx={{ width: 150, height: 150 }}
							onClick={() => navigate(`/dev/${junior_dev_id}`)}
						/>
					</Grid>
					<Grid item container xs direction='column'>
						<Grid
							item
							xs
							sx={{
								marginLeft: '1rem',
								alignItems: 'flex-end',
								textAlign: 'right',
							}}
						>
							<h3>{`${first_name} ${last_name} (${headline})`}</h3>
							<p>Applied on: {formatted_date}</p>
						</Grid>
						<Grid container item direction='row' className='apply-text'>
							<Grid item xs={12}>
								<p>{phone_number}</p>
								<p>{email}</p>
								<p>{dev_location}</p>
							</Grid>
						</Grid>
						<Grid
							item
							container
							direction='row'
							sx={{ alignContent: 'center' }}
						>
							<Grid
								item
								xs={4}
								onClick={() => window.open(resume_url, '_blank')}
								className='apply-text-icon'
							>
								<h4>
									<FolderOpen /> Resume
								</h4>
							</Grid>
							<Grid
								item
								xs={4}
								onClick={() => window.open(github_url, '_blank')}
								className='apply-text-icon'
							>
								<h4>
									<GitHub /> Github
								</h4>
							</Grid>
							<Grid
								item
								xs={4}
								onClick={() => window.open(linkedin_url, '_blank')}
								className='apply-text-icon'
							>
								<h4>
									<LinkedIn /> LinkedIn
								</h4>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</CardContent>
			<CardActions disableSpacing>
				<Grid container direction='row'>
					<Grid item container xs>
						<Grid item>
							{!is_accepted && (
								<Button
									variant='outlined'
									color='success'
									sx={{ mr: '1rem' }}
									onClick={() => {
										acceptApplication(app_id, postType);
										console.log(app_id, postType);
									}}
								>
									Accept
								</Button>
							)}
							{is_accepted && (
								<Button
									variant='contained'
									color='success'
									sx={{ mr: '1rem' }}
									onClick={() => {
										acceptApplication(app_id, postType);
										console.log(app_id, postType);
									}}
								>
									Accept
								</Button>
							)}
						</Grid>
						<Grid item>
							{!is_accepted && (
								<Button
									variant='outlined'
									color='error'
									onClick={() => {
										// declineApplication(id, postType);
										console.log('decline', app_id, postType);
									}}
								>
									Decline
								</Button>
							)}
							{is_accepted && (
								<Button
									variant='outlined'
									color='error'
									onClick={() => {
										// declineApplication(id, postType);
										console.log('decline', app_id, postType);
									}}
								>
									Decline
								</Button>
							)}
						</Grid>
					</Grid>
					<Grid item className='expand-text'>
						See More
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
					<p className='description'>{bio}</p>
				</CardContent>
			</Collapse>
		</>
	);
}
