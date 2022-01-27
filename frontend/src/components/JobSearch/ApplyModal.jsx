import { useState, useContext } from 'react';
import axios from 'axios';
import '../styles/SearchResults/ApplyModal.scss';

// mui //
import { Button, Box, Dialog } from '@mui/material';
import { makeStyles } from '@mui/styles';

// icons //
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FolderIcon from '@mui/icons-material/Folder';

// react-router
import { useNavigate } from 'react-router-dom';

// context //
import { UserContext } from '../../Providers/userProvider.jsx';

const useStyles = makeStyles({
	apply_btn: {
		color: '#f9f9f9',
		'background-color': '#182c5b',
		height: '2.5rem',
		'margin-right': '10px',
		'text-transform': 'none',
		'flex-grow': 1,
		'max-width': '118px',
	},

	apply_modal: {
		'background-color': '#EEF3F9',
		color: '#182c5b',
		display: 'flex',
		justifyContent: 'center',
	},

	edit: {
		color: '#182c5b',
		border: '2px solid #182c5b',
		'text-transform': 'none',
		'font-weight': 700,
	},

	submit: {
		background: '#182c5b',
		'text-transform': 'none',
	},

	exit_btn: {
		position: 'absolute',
		right: 0,
		margin: '10px',
		top: 0,
	},

	more_jobs: {
		color: '#182c5b',
		border: '2px solid #182c5b',
		'text-transform': 'none',
		'font-weight': 700,
	},

	view_application: {
		background: '#182c5b',
		'text-transform': 'none',
	},
	icon: {
		color: '#048679',
	},
});

export default function ApplyModal(props) {
	const { jobApplying, handleClick } = props;
	const { currentUser, profileView, setProfileView } = useContext(UserContext);

	const [applicationSubmitted, setApplicationSubmitted] = useState(false);
	const [openModal, setOpenModal] = useState(false);

	const classes = useStyles();
	const navigate = useNavigate();

	const handleView = () => {
		openModal === true ? setOpenModal(false) : setOpenModal(true);
	};

	const handleClickandView = () => {
		handleView();
		handleClick && handleClick();
	};

	const submitApplication = () => {
		console.log(jobApplying.gig_posting_id);
		if (jobApplying.gig_posting_id) {
			axios
				.post('/api/gig_applications/new', {
					gig_posting_id: jobApplying.id,
					junior_dev_id: currentUser.id,
				})
				.then(res => {
					console.log(res.data);
					setApplicationSubmitted(true);
					return res.data;
				})
				.then(data => {
					sendEmail(
						'creativereyne@gmail.com',
						currentUser,
						jobApplying.job_title
					);
				})
				.catch(err => {
					console.log(err);
				});
			return;
		} else {
			axios
				.post('/api/job_applications/new', {
					job_posting_id: jobApplying.id,
					junior_dev_id: currentUser.id,
				})
				.then(res => {
					console.log(res.data);
					setApplicationSubmitted(true);
					return res.data;
				})
				.then(data => {
					sendEmail(
						'creativereyne@gmail.com',
						currentUser,
						jobApplying.job_title
					);
				})
				.catch(err => {
					console.log(err);
				});
		}
	};

	const sendEmail = (email, currentUser, job_title) => {
		axios
			.post('/send_email', {
				params: {
					to: email,
					from: 'applyjuniorstacks@gmail.com', // Use the email address or domain you verified
					subject: `${job_title}: New Application From ${currentUser.first_name} ${currentUser.last_name}`,
					text: `You've got a new application on Junior!`,
					html: `<h1>You've got a new application on <a href='http://localhost:3000/'>Junior!</a><h1>`,
				},
			})
			.then(res => {
				console.log('yay!');
			})
			.catch(err => console.log(err));
	};

	const navigateToProfile = () => {
		navigate(`/dev/${currentUser.id}`, { state: true });
	};

	return (
		<>
			<Button
				onClick={handleClickandView}
				variant='contained'
				className={classes.apply_btn}
			>
				Apply
			</Button>

			<Dialog
				open={openModal}
				onClose={handleView}
				fullWidth={true}
				maxWidth={applicationSubmitted ? 'sm' : 'md'}
				className={classes.dialog}
			>
				<Box className={classes.apply_modal} id='apply-modal'>
					{applicationSubmitted ? (
						<div className='submitted-container'>
							<p id='submitted-msg'>Application Submitted!</p>
							<div id='submitted-actions'>
								<Button
									variant='outlined'
									onClick={() => {
										handleView();
										navigate('/jobs');
									}}
									className={classes.more_jobs}
								>
									Search More Jobs
								</Button>
								<Button
									variant='contained'
									onClick={() => {
										navigate(`/dev/${currentUser.id}`);
										setProfileView('applications');
									}}
									className={classes.view_application}
								>
									View Application
								</Button>
							</div>
						</div>
					) : (
						<section className='apply-profile-bio'>
							<h1 id='job-title'>Application for {jobApplying.job_title}</h1>
							<div className='apply-profile-data'>
								<div className='apply-profile-pic'>
									<img
										id='apply-user-photo'
										src={currentUser.photo_url}
										alt='Avatar'
									></img>
								</div>
								<div className='apply-user-info'>
									<div id='apply-name-headline'>
										<h1 id='apply-name'>{`${currentUser.first_name} ${currentUser.last_name}`}</h1>
										<h2 id='apply-headline'>
											{currentUser.headline ? currentUser.headline : 'N/A'}
										</h2>
									</div>
									<div className='apply-phone-city'>
										<div className='apply-text-icon'>
											<LocalPhoneIcon />
											<h3 id='apply-phone'> {currentUser.phone_number}</h3>
										</div>
										<div className='apply-text-icon'>
											<EmailOutlinedIcon />
											<h3 id='apply-email'> {currentUser.email}</h3>
										</div>
										<div className='apply-text-icon'>
											<FmdGoodOutlinedIcon />
											<h3 id='apply-city'> {currentUser.city}, Canada</h3>
										</div>
									</div>
									<div className='apply-text-icon'>
										<GitHubIcon />
										<h4>Github</h4>
									</div>
									<a
										href={currentUser.github_url ? currentUser.github_url : ''}
									>
										{currentUser.github_url ? currentUser.github_url : 'N/A'}
									</a>
									<div>
										<div className='apply-text-icon'>
											<FolderIcon />
											<h4>Resume Link </h4>
										</div>
										<a
											href={
												currentUser.resume_url ? currentUser.resume_url : ''
											}
										>
											{currentUser.resume_url ? currentUser.resume_url : 'N/A'}
										</a>
									</div>
									<div>
										<div className='apply-text-icon'>
											<LinkedInIcon />
											<h4>LinkedIn</h4>
										</div>
										<a
											href={
												currentUser.linkedin_url ? currentUser.linkedin_url : ''
											}
										>
											{currentUser.linkedin_url
												? currentUser.linkedin_url
												: 'N/A'}
										</a>
									</div>
									<div className='btn-container'>
										{applicationSubmitted ? null : (
											<Button
												variant='outlined'
												onClick={navigateToProfile}
												className={classes.edit}
											>
												Edit Profile
											</Button>
										)}
										{applicationSubmitted ? null : (
											<Button
												variant='contained'
												onClick={submitApplication}
												className={classes.submit}
											>
												Submit Application
											</Button>
										)}
									</div>
								</div>
							</div>
						</section>
					)}
					<CancelOutlinedIcon
						onClick={handleView}
						className={classes.exit_btn}
					/>
				</Box>
			</Dialog>
		</>
	);
}
