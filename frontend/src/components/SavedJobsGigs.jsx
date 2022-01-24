import axios from 'axios';
import { Card, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import SavedJobsGigsCard from '../components/SavedJobsGigsCard';
import { UserContext } from '../Providers/userProvider';

export default function Applications(props) {
	const { currentUser, savedJobsGigs, setSavedJobsGigs } =
		useContext(UserContext);
	const { setProfileView, profileView } = props;

	const [view, setView] = useState('all');

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
			<Grid container xs={12} direction='column'>
				<Grid
					item
					container
					direction='row'
					sx={{ justifyContent: 'space-between' }}
				>
					<Grid item>
						<ToggleButtonGroup
							color='primary'
							value={view}
							exclusive
							id='toggle-user-applications'
							onChange={e => handleView(e.target.value)}
						>
							<ToggleButton value='job'>Jobs</ToggleButton>
							<ToggleButton value='all'>All</ToggleButton>
							<ToggleButton value='gig'>Gigs</ToggleButton>
						</ToggleButtonGroup>
					</Grid>
				</Grid>
				<section className='application-cards'>
					<Grid container item xs={12}>
						{view === 'job' && parsedSavedJobs}
						{view === 'gig' && parsedSavedGigs}
						{view === 'all' && (
							<>
								{parsedSavedJobs} {parsedSavedGigs}
							</>
						)}
					</Grid>
				</section>
			</Grid>
		</div>
	);
}
