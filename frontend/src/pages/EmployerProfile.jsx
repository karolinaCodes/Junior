import './styles/Profile.scss';
import { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../Providers/userProvider';
import {
	Grid,
	Button,
	Modal,
	Box,
	Paper,
	Card,
	CardActionArea,
	CardActions,
	Dialog,
} from '@mui/material';
import JobPostingCard from '../components/JobPostingCard';
import JobPostingModal from '../components/JobPostingModal';

import axios from 'axios';
import EmployerProfileBio from '../../src/components/EmployerProfileBio';
import EmployerProfileHeader from '../../src/components/EmployerProfileHeader';
import Applications from '../components/Applications';

export default function Profile(props) {
	const { currentUser } = useContext(UserContext);

	const [profile, setProfile] = useState({
		employer: {},
		jobs: [],
		gigs: [],
	});
	const [openModal, setOpenModal] = useState(false);
	const [modalData, setModalData] = useState();
	const [profileView, setProfileView] = useState('postings');
	const [applications, setApplications] = useState({
		postType: 'job',
		postId: '2',
	});

	const handleView = () => {
		openModal === true ? setOpenModal(false) : setOpenModal(true);
	};

	const { employer_id } = useParams();

	const location = useLocation();

	const { company_name, email, photo_url, bio } = profile.employer;
	const { id } =
		currentUser.company_name === profile.company_name ? currentUser : 0;

	useEffect(() => {
		if (employer_id === id) {
			const employerUrl = `/api/employers/${id}`;
			const employerJobsUrl = `/api/employers/${id}/job_postings`;
			const employerGigsUrl = `/api/employers/${id}/gig_postings`;
			const employerPromise = axios.get(employerUrl);
			const jobsPromise = axios.get(employerJobsUrl);
			const gigsPromise = axios.get(employerGigsUrl);
			Promise.all([employerPromise, jobsPromise, gigsPromise]).then(data => {
				const employerData = data[0].data;
				const jobPostingsData = data[1].data;
				const gigPostingsData = data[2].data;
				setProfile(prev => ({
					...prev,
					jobs: jobPostingsData,
					employer: employerData,
					gigs: gigPostingsData,
				}));
			});
		} else if (employer_id !== id) {
			const employerUrl = `/api/employers/${employer_id}`;
			const employerJobsUrl = `/api/employers/${employer_id}/job_postings`;
			const employerGigsUrl = `/api/employers/${employer_id}/gig_postings`;
			const employerPromise = axios.get(employerUrl);
			const jobsPromise = axios.get(employerJobsUrl);
			const gigsPromise = axios.get(employerGigsUrl);
			Promise.all([employerPromise, jobsPromise, gigsPromise]).then(data => {
				const employerData = data[0].data;
				const jobPostingsData = data[1].data;
				const gigPostingsData = data[2].data;
				setProfile(prev => ({
					...prev,
					jobs: jobPostingsData,
					employer: employerData,
					gigs: gigPostingsData,
				}));
			});
		}
	}, [currentUser, openModal, location]);

	// Get job and gig information for employer from state
	const jobsArray = profile.jobs;
	const gigsArray = profile.gigs;

	// Create cards for each job and gig
	const parsedJobs = Array.isArray(jobsArray)
		? jobsArray.map(job => {
				const data = <JobPostingCard key={'Job-modal-' + job.id} {...job} />;

				// const applicationLink = `employerprofile/job/${job.id}/applications`;
				const postingLink = `job/${job.id}`;
				return (
					<Grid
						item
						xs={12}
						sm={6}
						md={4}
						lg={3}
						key={'Job-grid-item-' + job.id}
					>
						<Grid
							container
							direction='column'
							key={'Job-grid-container-' + job.id}
						>
							<Card key={'Job-card-' + job.id}>
								<CardActionArea
									key={'Job-card-action' + job.id}
									onClick={() => {
										setModalData(data);
										handleView();
									}}
								>
									<JobPostingCard
										key={'Job-card-' + job.id}
										type='job'
										{...job}
									/>
								</CardActionArea>
								{currentUser.company_name === company_name && (
									<CardActions key={'Job-card-actions-' + job.id}>
										<Button
											variant='contained'
											color='primary'
											key={'Job-button-' + job.id}
											onClick={() => {
												setApplications({ postType: 'job', postId: job.id });
												setProfileView('applications');
											}}
										>
											Applications
										</Button>
										<Button
											variant='contained'
											color='primary'
											key={'Job-button-post-' + job.id}
											className='card-footer'
											onClick={() => window.open(postingLink, '_self')}
										>
											Posting
										</Button>
									</CardActions>
								)}
							</Card>
						</Grid>
					</Grid>
				);
		  })
		: [];

	const parsedGigs = Array.isArray(jobsArray)
		? gigsArray.map(gig => {
				const data = <JobPostingCard key={'Gig-modal-' + gig.id} {...gig} />;
				// const applicationLink = `employerprofile/gig/${gig.id}/applications`;
				const postingLink = `gig/${gig.id}`;
				return (
					<Grid
						item
						xs={12}
						sm={6}
						md={4}
						lg={3}
						key={'Gig-grid-item-' + gig.id}
					>
						<Grid
							container
							direction='column'
							key={'Gig-grid-container-' + gig.id}
						>
							<Card key={'Gig-card-' + gig.id}>
								<CardActionArea
									key={'Gig-card-action' + gig.id}
									onClick={() => {
										setModalData(data);
										handleView();
									}}
								>
									<JobPostingCard
										key={'Gig-card-post-' + gig.id}
										type='gig'
										{...gig}
									/>
								</CardActionArea>
								{currentUser.company_name === company_name && (
									<CardActions key={'Gig-card-actions-' + gig.id}>
										<Button
											variant='contained'
											color='primary'
											key={'Gig-button-' + gig.id}
											className='card-footer'
											onClick={() => {
												setApplications({ postType: 'gig', postId: gig.id });
												setProfileView('applications');
											}}
										>
											Applications
										</Button>
										<Button
											variant='contained'
											color='primary'
											key={'Gig-button-post-' + gig.id}
											className='card-footer'
											onClick={() => window.open(postingLink, '_self')}
										>
											Posting
										</Button>
									</CardActions>
								)}
							</Card>
						</Grid>
					</Grid>
				);
		  })
		: [];

	// Set data for New Job and New Gig modals
	// const newJobModal = (
	// 	<NewJobPost
	// 		openModal={openModal}
	// 		setOpenModal={setOpenModal}
	// 		handleView={handleView}
	// 	/>
	// );
	// const newGigModal = (
	// 	<NewGigPost
	// 		openModal={openModal}
	// 		setOpenModal={setOpenModal}
	// 		handleView={handleView}
	// 	/>
	// );

	return (
		<>
			<EmployerProfileHeader
				setModalData={setModalData}
				openModal={openModal}
				setOpenModal={setOpenModal}
				profileView={profileView}
				setProfileView={setProfileView}
				profile={profile}
				setProfile={setProfile}
				employer_id={employer_id}
			/>
			<div className='profile-content page-container'>
				{/* <Grid container className='profile-bio'> */}
				{/* <Grid item className='profile-pic'>
					<img id='profile-pic' src={photo_url} alt='Avatar'></img>
				</Grid> */}
				<EmployerProfileBio profile={profile} />
				{/* <Grid item className='profile-name'>
					<h4>Company Name: {company_name}</h4>
					<h4>Bio: {bio ? bio : 'N/A'}</h4>
				</Grid>
				<Grid item className='profile-links'>
					<h4>Email: {email}</h4>
					<h4>Job Postings: {profile.jobs.length}</h4>
					<h4>Gig Postings: {profile.gigs.length}</h4>
				</Grid> */}
				{/* </Grid> */}
				{/* <Grid container direction='column'> */}
				<section className='posting-content'>
					<Grid container>
						{/* {profileView === 'postings' && postings}
							{profileView === 'applications' && applications}
							{profileView === 'saved' && savedPostings} */}

						{/* <Button
								onClick={() => {
									setModalData(newJobModal);
									handleView();
								}}
							>
								Hey
							</Button>
							<Button
								onClick={() => {
									setModalData(newGigModal);
									handleView();
								}}
							>
								Listen
							</Button> */}

						{/* Applications */}
						{profileView === 'applications' && (
							<>
								<Applications
									employer={profile.employer}
									profileView={profileView}
									setProfileView={setProfileView}
									applications={applications}
								/>
							</>
						)}
						{/* Postings page */}

						{profileView === 'postings' && (
							<>
								{parsedJobs.length === 0 && parsedGigs.length === 0 && (
									<h1>No postings.</h1>
								)}
								{/* if there are job postings */}
								{parsedJobs.length !== 0 && (
									<section className='profile-cards'>
										<Grid container>{parsedJobs}</Grid>
									</section>
								)}
								{/* if there are gig postings */}
								{parsedGigs.length !== 0 && (
									<section className='profile-cards'>
										<Grid container>{parsedGigs}</Grid>
									</section>
								)}
							</>
						)}
					</Grid>
				</section>
				{/* </Grid> */}
				<Dialog
					open={openModal}
					onClose={handleView}
					fullWidth={true}
					maxWidth={'md'}
					scroll='body'
				>
					<Box className='portfolio-modal'>{modalData}</Box>
				</Dialog>
			</div>
		</>
	);
}
