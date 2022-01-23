import './styles/Profile.scss';
import axios from 'axios';
import { Card, Grid } from '@mui/material';
import { useContext, useEffect } from 'react';
import SavedJobsGigsCard from '../components/SavedJobsGigsCard';
import { UserContext } from '../Providers/userProvider';

export default function Applications(props) {
	const { currentUser, savedJobsGigs, setSavedJobsGigs } =
		useContext(UserContext);

	useEffect(() => {
		axios
			.get(`/api/save/${currentUser.id}`)
			.then(res => {
				setSavedJobsGigs(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, [currentUser, setSavedJobsGigs]);

	return (
		<div className='application-content'>
			<Grid container direction='column'>
				<h1>Saved</h1>
				<section className='application-cards'>
					<h3>Saved Jobs</h3>
					<Grid container item>
						{savedJobsGigs.jobs &&
							savedJobsGigs.jobs.map((savedJob, index) => {
								return (
									<Grid
										item
										xs={12}
										md={6}
										key={'SavedJobs-grid-' + savedJob.job_posting_id}
									>
										<Card className='card-click'>
											<SavedJobsGigsCard saved={savedJob} />
										</Card>
									</Grid>
								);
							})}
					</Grid>
					<h3>Saved Gigs</h3>
					<Grid container item>
						{savedJobsGigs.gigs &&
							savedJobsGigs.gigs.map(savedGig => {
								return (
									<Grid
										item
										xs={12}
										md={6}
										key={'SavedGigs-grid-' + savedGig.gig_posting_id}
									>
										<Card className='card-click'>
											<SavedJobsGigsCard saved={savedGig} />
										</Card>
									</Grid>
								);
							})}
					</Grid>
				</section>
			</Grid>
		</div>
	);
}
