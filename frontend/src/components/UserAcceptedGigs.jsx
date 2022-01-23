// import './styles/Profile.scss';
import { Card, Modal, Box, Grid, Paper, Dialog } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserApplicationCard from '../components/UserApplicationCard';
import UserApplicationModal from '../components/UserApplicationModal';

import axios from 'axios';
import { UserContext } from '../Providers/userProvider';

export default function UserAcceptedGigs(props) {
	// const { first_name, last_name, id } = props.currentUser;
	const { currentUser } = useContext(UserContext);
	// console.log(currentUser);
	const id = 1;
	const [applications, setApplications] = useState({
		accepted: [],
	});

	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		if (id) {
			const applicationsUrl = `/api/devs/${id}/accepted/gig`;
			Promise.all([axios.get(applicationsUrl)]).then(all => {
				const [applicationsData] = all;
				setApplications(prev => ({
					...prev,
					accepted: applicationsData.data,
				}));
			});
		}
	}, [id]);

	const acceptedApplicationsArray = applications.accepted;

	const parsedAcceptedApplications = acceptedApplicationsArray.map(
		application => {
			return (
				<Grid
					item
					xs={12}
					md={6}
					key={'Job-application-grid-' + application.id}
				>
					<Card key={'Job-application-Card-' + application.id}>
						<UserApplicationCard
							key={'Job-application-card-' + application.id}
							type={'job'}
							{...application}
						/>
					</Card>
				</Grid>
			);
		}
	);

	return (
		<div className='application-content'>
			<Grid container direction='column'>
				<section className='application-cards'>
					<h3>Accepted Applications:</h3>
					<Grid container item>
						{parsedAcceptedApplications}
					</Grid>
				</section>
			</Grid>
		</div>
	);
}
