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
import { useParams } from 'react-router-dom';
import ApplicationCard from '../components/ApplicationCard';
import ApplicationModal from '../components/ApplicationModal';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import axios from 'axios';
import { UserContext } from '../Providers/userProvider';

export default function Applications(props) {
	const { currentUser } = useContext(UserContext);
	// Get the posting id from url
	const { posttype, postid } = useParams();
	// path="/:employerid/:type/:posting_id/applications"
	// Declare job or gig

	const [posting, setPosting] = useState({
		posting: {},
		applications: [''],
	});

	const { employer } = props;

	// FOR TESTING //
	// const employerid = id;

	useEffect(() => {
		const postingUrl = `/api/${posttype}_postings/${postid}`;
		const applicationsUrl = `/api/${posttype}_postings/${postid}/applications`;
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
	}, []);

	const applicationsArray = posting.applications;
	const parsedApplications = applicationsArray.map(application => {
		console.log(application);
		return (
			<Grid item xs={12} md={6} key={'Application-grid-' + application.pid}>
				<Card className='card-click'>
					<ApplicationCard type={posttype} {...application} />
				</Card>
			</Grid>
		);
	});

	return (
		<div className='application-content page-container'>
			<Grid container direction='column'>
				<h1>Applications</h1>
				<p>Total applications: {posting.applications.length}</p>
				<section className='application-cards'>
					<Grid container item>
						{parsedApplications}
					</Grid>
				</section>
			</Grid>
		</div>
	);
}
