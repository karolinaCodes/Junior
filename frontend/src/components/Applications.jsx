import './styles/PortfolioCard.scss';
import {TextField, Button, Modal, Box, Grid, Paper} from '@mui/material';

export default function ApplicationCard(props) {
	const { first_name, last_name, email, bio, photo_url, github_url, linkedIn_url, resume_url, location } =
		props;
	// const datePostedFormatted = new Date(date_posted).toLocaleDateString();

	return (
		<Grid container>
			<Grid item>
				<img src={photo_url} alt={`${first_name} ${last_name}`} height="150" />
			</Grid>
			<Grid item>
				<h1>{`${first_name} ${last_name}`}</h1>
				<p>{email}</p>
				<p>Github: {github_url}</p>
				<p>LinkedIn: {linkedIn_url}</p>
				<p>Resume: {resume_url}</p>
				<p>{location}</p>
			</Grid>
			<Grid item>
				<p>{bio}</p>
			</Grid>
		</Grid>
	);
}
