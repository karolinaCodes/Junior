import axios from 'axios';
import {
	Button,
	Card,
	Grid,
	ToggleButton,
	ToggleButtonGroup,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import SavedJobsGigsCard from '../components/SavedJobsGigsCard';
import { UserContext } from '../Providers/userProvider';
// import useVisualMode from '../hooks/useVisualMode';

export default function Applications(props) {
	const { currentUser, savedJobsGigs, setSavedJobsGigs, setProfileView } =
		useContext(UserContext);

	const [view, setView] = useState('all');

	// const { back, transition } = useVisualMode('projects');

	const handleView = value => {
		setView(value);
	};

	const parsedSavedGigs = savedJobsGigs.gigs.map(savedGig => {
		return (
			<Grid
				item
				xs={6}
				md={6}
				key={'SavedGigs-grid-' + savedGig.gig_posting_id}
			>
				<Card className='card-click'>
					<SavedJobsGigsCard saved={savedGig} />
				</Card>
			</Grid>
		);
	});

	const parsedSavedJobs = savedJobsGigs.jobs.map((savedJob, index) => {
		return (
			<Grid item xs={6} key={'SavedJobs-grid-' + savedJob.job_posting_id}>
				<Card className='card-click'>
					<SavedJobsGigsCard saved={savedJob} />
				</Card>
			</Grid>
		);
	});

	return (
		<div className='application-content page-container'>
			<Grid container direction='column'>
				<Grid
					item
					container
					direction='row'
					sx={{ justifyContent: 'space-between' }}
				>
					<Grid item>
						<Button
							variant='outlined'
							color='primary'
							id='profile-go-back-button'
							onClick={e => {
								setProfileView('projects');
							}}
						>
							Back to Portfolio
						</Button>
					</Grid>
				</Grid>
				<section className='application-cards'>
					<Grid container item xs={12}>
						{parsedSavedJobs} {parsedSavedGigs}
					</Grid>
				</section>
			</Grid>
		</div>
	);
}
