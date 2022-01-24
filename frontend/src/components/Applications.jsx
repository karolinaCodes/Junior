// import './styles/Profile.scss';
import {
	Card,
	Button,
	Modal,
	Box,
	Grid,
	Paper,
	Dialog,
	CardActions,
	IconButton,
	Collapse,
	CardContent,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ApplicationCard from '../components/ApplicationCard';
import ApplicationModal from '../components/ApplicationModal';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import axios from 'axios';
import { UserContext } from '../Providers/userProvider';

export default function Applications(props) {
	const { currentUser } = useContext(UserContext);
	// Get the posting id from url
	// const { postType, postId } = useParams();
	// path="/:employerid/:type/:posting_id/applications"
	// Declare job or gig

	const { postType, postId } = props.applications;
	const { employer, profileView, setProfileView } = props;

	console.log(`type ${postType}, id ${postId}`);
	const [posting, setPosting] = useState({
		posting: {},
		applications: [''],
	});

	const location = useLocation();
	console.log('location', location);

	useEffect(() => {
		const postingUrl = `/api/${postType}_postings/${postId}`;
		const applicationsUrl = `/api/${postType}_postings/${postId}/applications`;
		Promise.all([axios.get(postingUrl), axios.get(applicationsUrl)]).then(
			all => {
				const [postingData, applicationsData] = all;
				setPosting(prev => ({
					...prev,
					posting: postingData.data,
					applications: applicationsData.data,
				}));
			}
		);
	}, [profileView]);

	const applicationsArray = posting.applications;
	const parsedApplications = applicationsArray.map(application => {
		console.log(application);
		return (
			<Grid item xs={12} md={6} key={'Application-grid-' + application.app_id}>
				<Card className='card-click'>
					<ApplicationCard type={postType} {...application} />
				</Card>
			</Grid>
		);
	});

	return (
		<div className='application-content page-container'>
			<Grid container direction='column'>
				<section className='application-cards'>
					<Grid item>
						<Button
							id='applications-back-button'
							onClick={e => setProfileView('postings')}
						>
							Back
						</Button>
					</Grid>
					<Grid container item>
						{parsedApplications}
					</Grid>
				</section>
			</Grid>
		</div>
	);
}
