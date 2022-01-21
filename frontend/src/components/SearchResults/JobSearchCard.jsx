import './styles/JobSearchCard.scss';
import { Grid, Paper } from '@mui/material';

export default function Profile(props) {
	const { title, thumbnail, description } = props;

	// Need to loop through each project from user
	// and ad new card for each one.

	return (
		<section className='cards'>
			<Grid container direction='row' justifyContent='space-around' spacing={1}>
				<Grid item xs={10} md={3}>
					<Paper>
						<div className='card-content'>
							<h1>Job Title</h1>
							<h2>Company Name</h2>
							<h3>Job Type</h3>
							<p>Description Testing How Long This Is.</p>
						</div>
					</Paper>
				</Grid>
			</Grid>
		</section>
	);
}
