import './styles/UserProfileInfo.scss';

import { Grid } from '@mui/material';

export default function UserProfileInfo(props) {
	const { currentUser } = props;

	const {
		first_name,
		last_name,
		email,
		photo_url,
		github_url,
		linkedIn_url,
		bio,
	} = currentUser;

	return (
		<Grid
			container
			className='profile-bio'
			columnSpacing={{ xs: 1, sm: 2, md: 3 }}
		>
			<Grid item className='profile-pic'>
				<img id='profile-pic' src={photo_url} alt='Avatar'></img>
			</Grid>
			<Grid item className='profile-name'>
				<h4>Name: {`${first_name} ${last_name}`}</h4>
				<h4>Bio: {bio ? bio : 'N/A'}</h4>
			</Grid>
			<Grid item className='profile-links'>
				<h4>Email: {email}</h4>
				<h4>GitHub: {github_url ? github_url : 'N/A'}</h4>
				<h4>LinkedIn: {linkedIn_url ? linkedIn_url : 'N/A'}</h4>
			</Grid>
		</Grid>
	);
}
