import './styles/Profile.scss';
import { Card, Modal, Box, Grid, Paper, Dialog } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApplicationCard from '../components/ApplicationCard';
import ApplicationModal from '../components/ApplicationModal';

import axios from 'axios';
import { UserContext } from '../Providers/userProvider';

export default function Applications(props) {
	const { currentUser } = useContext(UserContext);
	// Get the posting id from url
	// const {employerid, posttype, postid} = useParams();
	const { posttype, postid } = useParams();
	// path="/:employerid/:type/:posting_id/applications"
	// Declare job or gig

	const [profile, setProfile] = useState({
		employer: {},
	});
	const [posting, setPosting] = useState({
		posting: {},
		applications: [''],
	});

	const [openModal, setOpenModal] = useState(false);
	const [modalData, setModalData] = useState();

	const handleView = () => {
		openModal === true ? setOpenModal(false) : setOpenModal(true);
	};

	// TESTING
	const employerid = 1;
	// TESTING

	useEffect(() => {
		const employerUrl = `/api/employers/${employerid}`;
		const postingUrl = `/api/${posttype}_postings/${postid}`;
		const applicationsUrl = `/api/${posttype}_postings/${postid}/applications`;
		Promise.all([
			axios.get(employerUrl),
			axios.get(postingUrl),
			axios.get(applicationsUrl),
		]).then(all => {
			const [employerData, postingData, applicationsData] = all;
			setProfile(prev => ({ ...prev, employer: employerData.data }));
			setPosting(prev => ({
				...prev,
				posting: postingData.data,
				applications: applicationsData.data,
			}));
		});
	}, []);

	const applicationsArray = posting.applications;
	const parsedApplications = applicationsArray.map(application => {
		const data = (
			<ApplicationModal
				key={'Application-modal-' + application.id}
				{...application}
			/>
		);
		return (
			<Grid item xs={12} md={6} key={'Application-grid-' + application.id}>
				<Card
					className='card-click'
					onClick={() => {
						setModalData(data);
						handleView();
					}}
					key={'Application-paper-' + application.id}
				>
					<ApplicationCard
						key={'Application-card-' + application.id}
						{...application}
					/>
				</Card>
			</Grid>
		);
	});

	return (
		<div className='application-content'>
			<Grid container direction='column'>
				<h1>Applications</h1>
				<p>Total applications: {posting.applications.length}</p>
				<section className='application-cards'>
					<Grid container item>
						{parsedApplications}
					</Grid>
				</section>
			</Grid>

			<Dialog
				open={openModal}
				onClose={handleView}
				fullWidth={true}
				maxWidth={'md'}
			>
				<Box className='application-modal'>{modalData}</Box>
			</Dialog>
		</div>
	);
}
