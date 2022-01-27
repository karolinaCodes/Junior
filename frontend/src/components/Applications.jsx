import axios from 'axios';
// import './styles/Profile.scss';
import { useEffect, useState } from 'react';
import { Card, Button, Grid } from '@mui/material';
import ApplicationCard from '../components/ApplicationCard';

export default function Applications(props) {
	// Get the posting id from url
	// const { postType, postId } = useParams();
	// path="/:employerid/:type/:posting_id/applications"
	// Declare job or gig

	const { postType, postId } = props.applications;
	const { profileView, setProfileView } = props;

	console.log(`type ${postType}, id ${postId}`);
	const [posting, setPosting] = useState({
		posting: {},
		applications: [''],
	});
	const [buttonAccepted, setButtonAccepted] = useState(false);

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
	}, [profileView, buttonAccepted]);

	const applicationsArray = posting.applications;
	const parsedApplications = applicationsArray.map(application => {
		console.log(application);
		return (
			<Grid item xs={12} md={6} key={'Application-grid-' + application.app_id}>
				<Card className='card-click'>
					<ApplicationCard
						type={postType}
						buttonAccepted={buttonAccepted}
						setButtonAccepted={setButtonAccepted}
						{...application}
					/>
				</Card>
			</Grid>
		);
	});

	return (
		<div className='application-content page-container'>
			<Grid container direction='column' sx={{ width: '100%' }}>
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
