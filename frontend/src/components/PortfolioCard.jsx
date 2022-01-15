import './styles/PortfolioCard.scss';
import { Grid, Paper } from '@mui/material';

export default function Profile(props) {
	const { title, thumbnail, description } = props;

	// Need to loop through each project from user
	// and ad new card for each one.

	return (
		<section className='cards'>
			<Grid
				container
				direction='row'
				justifyContent='space-around'
				alignItems='center'
				spacing={1}
			>
				<Grid item xs={10} md={3}>
					<Paper>
						<h1>Title</h1>
						<img src='images/landing-page-image.png'></img>
						<p>Description Testing How Long This Is.</p>
					</Paper>
				</Grid>
			</Grid>
		</section>
	);
}
