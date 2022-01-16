import { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/ApplyModal.scss';
import { Button, Modal, Box, Typography } from '@mui/material';

export default function ApplyModal() {
	const [open, setOpen] = useState(false);
	const [profile, setProfile] = useState({
		dev: {},
	});

	const handleView = () => {
		open === true ? setOpen(false) : setOpen(true);
	};

	const style = {
		width: 1 / 2,
		height: 1 / 2,
		display: 'flex',
		flexDirection: 'column',
		margin: '10% 0 0 25%',
		background: '#223d55',
		color: 'black',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: '2rem',
	};

	// FOR TESTING
	const id = 1;
	//

	const {
		first_name,
		last_name,
		email,
		photo_url,
		github_url,
		linkedIn_url,
		bio,
	} = profile.dev;

	useEffect(() => {
		const devUrl = '/api/devs/' + id;
		axios.get(devUrl).then(profile => {
			setProfile(prev => ({
				...prev,
				dev: profile.data,
			}));
		});
	}, []);

	return (
		<div className='apply-modal'>
			<Button onClick={handleView} variant='contained'>
				Open modal
			</Button>
			<Modal
				open={open}
				onClose={handleView}
				// aria-labelledby='modal-modal-title'
				// aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<section className='profile-bio'>
						<img id='profile-pic' src={photo_url} alt='Avatar'></img>
						<section>
							<h1>Name: {`${first_name} ${last_name}`}</h1>
							<h1>Bio: {bio ? bio : 'N/A'}</h1>
						</section>
						<section>
							<h1>Email: {email}</h1>
							<h1>GitHub: {github_url ? github_url : 'N/A'}</h1>
							<h1>LinkedIn: {linkedIn_url ? linkedIn_url : 'N/A'}</h1>
						</section>
					</section>
					{/* <Typography id='modal-modal-title' variant='h6' component='h2'>
						Text in a modal
					</Typography>
					<Typography id='modal-modal-description' sx={{ mt: 2 }}>
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</Typography> */}
					<Button onClick={handleView} variant='contained'>
						Close
					</Button>
				</Box>
			</Modal>
		</div>
	);
}
