import './styles/Profile.scss';
import { Grid, Paper } from '@mui/material';

export default function Profile(props) {
	const { name, email, github, linkedin, bio } = props;

	return (
		<div className='profile-content'>
			<section className='profile-bio'>
				<img id='profile-pic' src='nil'></img>
				<h1>Name: {name}</h1>
				<h1>Email: {email}</h1>
				<h1>GitHub: {github}</h1>
				<h1>LinkedIn: {linkedin}</h1>
				<h1>Bio: {bio}</h1>
			</section>
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
					<Grid item xs={10} md={3}>
						<Paper>
							<h1>Title</h1>
							<img src='images/landing-page-image.png'></img>
							<p>Description Testing How Long This Is.</p>
						</Paper>
					</Grid>
					<Grid item xs={10} md={3}>
						<Paper>
							<h1>Title</h1>
							<img src='images/landing-page-image.png'></img>
							<p>Description Testing How Long This Is.</p>
						</Paper>
					</Grid>
					<Grid item xs={10} md={3}>
						<Paper>
							<h1>Title</h1>
							<img src='images/landing-page-image.png'></img>
							<p>Description Testing How Long This Is.</p>
						</Paper>
					</Grid>
				</Grid>
			</section>
		</div>
	);
}
