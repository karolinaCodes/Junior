import './styles/UserProfileHeader.scss';

import { Chip, Grid, Input, TextField, IconButton } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { minHeight } from '@mui/system';
import { useContext } from 'react';
import { UserContext } from '../Providers/userProvider';
import { useEffect } from 'react';
import {
	PersonPinCircle,
	PhoneAndroid,
	Email,
	MoreVert,
} from '@mui/icons-material';
import ProfileMenu from '../components/ProfileMenu';

export default function UserProfileHeader(props) {
	const { setModalData, openModal, setOpenModal } = props;
	const { currentUser, setCurrentUser } = useContext(UserContext);
	const [profileView, setProfileView] = useState('browse');
	const [editForm, setEditForm] = useState({
		...currentUser,
	});

	useEffect(() => {
		setEditForm(prev => ({ ...prev, ...currentUser }));
	}, [currentUser]);

	const {
		first_name,
		last_name,
		email,
		phone_number,
		headline,
		city,
		photo_url,
		id,
	} = currentUser;

	/* 

	*/

	const updateProfile = () => {
		axios
			.post(`/api/devs/edit`, editForm)
			.then(res => {
				setCurrentUser(prev => ({ ...prev, ...editForm }));
				setProfileView('browse');
			})
			.catch(err => console.log(err));
	};

	const editProfile = () => {
		if (profileView !== 'edit') {
			setProfileView('edit');
		} else {
			updateProfile();
		}
	};

	return (
		<>
			<img
				id='header-image'
				src='https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
				alt='Avatar'
			></img>
			<img id='portfolio-profile-pic' src={photo_url} alt='Avatar'></img>
			<Grid container direction='row' className='profile-header'>
				{profileView === 'edit' && (
					<form onSubmit={editProfile}>
						<Grid item className='profile-name'>
							<h4>{`${first_name} ${last_name}`}</h4>
							<TextField
								size='small'
								sx={{ mt: '2vh', minWidth: '12vw' }}
								label='Headline'
								value={editForm.headline}
								onChange={e =>
									setEditForm({ ...editForm, headline: e.target.value })
								}
							></TextField>
							<TextField
								size='small'
								sx={{ mt: '2vh', minWidth: '12vw' }}
								label='City'
								value={editForm.city}
								onChange={e =>
									setEditForm({ ...editForm, city: e.target.value })
								}
							></TextField>
						</Grid>
						<Grid item className='profile-links'>
							<TextField
								size='small'
								multiline={true}
								maxRows={3}
								sx={{ mt: '2vh', minWidth: '12vw' }}
								label='Email'
								value={editForm.email}
								onChange={e =>
									setEditForm({ ...editForm, email: e.target.value })
								}
							></TextField>
							<TextField
								size='small'
								sx={{ mt: '2vh', minWidth: '12vw' }}
								label='Phone Number'
								value={editForm.phone_number}
								onChange={e =>
									setEditForm({ ...editForm, phone_number: e.target.value })
								}
							></TextField>
						</Grid>
						<Grid
							item
							className='profile-buttons'
							sx={{ justifyContent: 'space-evenly' }}
						>
							<Chip label='Save' onClick={e => editProfile()} />
							<Chip label='Cancel' onClick={e => setProfileView('browse')} />
						</Grid>
					</form>
				)}
				{profileView === 'browse' && (
					<Grid item container direction='column'>
						<Grid item container>
							<Grid
								item
								container
								direction='row'
								sx={{ justifyContent: 'space-between' }}
								id='profile-name'
							>
								<Grid item xs>
									<h1>{`${first_name} ${last_name}`}</h1>
									<h3>{headline}</h3>
								</Grid>
								<Grid item id='kebab' sx={{ justifySelf: 'flex-end' }}>
									<ProfileMenu
										setModalData={setModalData}
										openModal={openModal}
										setOpenModal={setOpenModal}
									/>
								</Grid>
							</Grid>
						</Grid>
						<Grid
							item
							container
							id='contact-info'
							gap={5}
							direction='row'
							sx={{ alignItems: 'center' }}
						>
							<Grid item>
								<h4>
									<sub>
										<PersonPinCircle />{' '}
									</sub>
									{city}
								</h4>
							</Grid>
							<Grid item>
								<h4>
									<sub>
										<PhoneAndroid />{' '}
									</sub>
									{phone_number}
								</h4>
							</Grid>
							<Grid item>
								<h4>
									<sub>
										<Email />{' '}
									</sub>
									{email}
								</h4>
							</Grid>
						</Grid>
						{/* <Grid
							item
							className='profile-buttons'
							sx={{ justifyContent: 'space-evenly' }}
						>
							<Chip onClick={e => editProfile()} label='Edit Profile' />
						</Grid> */}
					</Grid>
				)}
			</Grid>
		</>
	);
}
