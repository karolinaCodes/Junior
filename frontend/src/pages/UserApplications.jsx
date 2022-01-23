import './styles/Profile.scss';
import { Card, Modal, Box, Grid, Paper, Dialog } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserApplicationCard from '../components/UserApplicationCard';
import ConfirmModal from '../components/UserApplicationConfirmModal';

import axios from 'axios';
import { UserContext } from '../Providers/userProvider';

export default function UserApplications(props) {
	// const { first_name, last_name, id } = props.currentUser;
	const { currentUser } = useContext(UserContext);
	// console.log(currentUser);
	const id = 1;
	const [applications, setApplications] = useState({
		jobApplications: [],
		gigApplications: [],
	});

	const [openModal, setOpenModal] = useState(false);
	const [modalData, setModalData] = useState();
  const handleModal = () => {
    openModal === true ? setOpenModal(false) : setOpenModal(true);
  };

	useEffect(() => {
		if (id) {
			const jobApplicationsUrl = `/api/devs/${id}/applications/job`;
			const gigApplicationsUrl = `/api/devs/${id}/applications/gig`;
			Promise.all([
				axios.get(jobApplicationsUrl),
				axios.get(gigApplicationsUrl),
			]).then(all => {
				const [jobApplicationsData, gigApplicationsData] = all;
				setApplications(prev => ({
					...prev,
					jobApplications: jobApplicationsData.data,
					gigApplications: gigApplicationsData.data,
				}));
			});
		}
	}, [id]);

	const jobApplicationsArray = applications.jobApplications;
	const gigApplicationsArray = applications.gigApplications;

	const parsedJobApplications = jobApplicationsArray.map(application => {
		return (
			<Grid item xs={12} md={6} key={'Job-application-grid-' + application.id}>
				<Card
					key={'Job-application-Card-' + application.id}
				>
					<UserApplicationCard
						key={'Job-application-card-' + application.id}
						type={'job'}
						{...application}
					/>
				</Card>
			</Grid>
		);
	});
	const parsedGigApplications = gigApplicationsArray.map(application => {
		const data = (<ConfirmModal key={'Gig-confirm-' + application.id} {...application} />);
		return (
			<Grid item xs={12} md={6} key={'Gig-application-grid-' + application.id}>
				<Card
					key={'Gig-application-Card-' + application.id}
				>
					<UserApplicationCard
						key={'Gig-application-card-' + application.id}
						type='gig'
						{...application}
					/>
				</Card>
			</Grid>
		);
	});

	return (
		<div className='application-content'>
			<Grid container direction='column'>
				<h1>My Applications</h1>
				<p>
					Total applications:{' '}
					{applications.jobApplications.length +
						applications.gigApplications.length}
				</p>
				<section className='application-cards'>
					<Grid container item>
						{parsedJobApplications}
						{parsedGigApplications}
					</Grid>
				</section>
			</Grid>
			<Dialog
        open={openModal}
        onClose={handleModal}
        fullWidth={true}
        maxWidth={'md'}
      >
        <Box className="portfolio-modal">
					Test

				</Box>
      </Dialog>
		</div>
	);
}
