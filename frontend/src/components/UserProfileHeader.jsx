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
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ProfileMenu from '../components/ProfileMenu';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PhoneIcon from '@mui/icons-material/Phone';

export default function UserProfileHeader(props) {
	const {
		setModalData,
		openModal,
		setOpenModal,
		setProfileView,
		profileView,
		dev_id,
		profile,
	} = props;
	const { currentUser, setCurrentUser } = useContext(UserContext);
	const [profileEdit, setProfileEdit] = useState(false);
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
	} = profile.dev;

	const updateProfile = () => {
		axios
			.post(`/api/devs/edit`, editForm)
			.then(res => {
				setCurrentUser(prev => ({ ...prev, ...editForm }));
				setProfileEdit(false);
			})
			.catch(err => console.log(err));
	};

	const editProfile = () => {
		if (!profileEdit) {
			setProfileEdit(true);
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
				{profileEdit === true && (
					<form id='profile-edit-options' onSubmit={editProfile}>
						<Grid item className='profile-name'>
							<h1>{`${first_name} ${last_name}`}</h1>
							<TextField
								size='small'
								sx={{ mt: '2vh', minWidth: '12vw' }}
								label='Headline'
								value={editForm.headline}
								onChange={e =>
									setEditForm({ ...editForm, headline: e.target.value })
								}
							></TextField>
							<Chip
								label='Save'
								sx={{ mb: -5.5, ml: '1rem' }}
								onClick={e => editProfile()}
							/>
							<Chip
								label='Cancel'
								sx={{ mb: -5.5, ml: '1rem' }}
								onClick={e => setProfileEdit(false)}
							/>
						</Grid>
						<Grid item className='profile-links'>
							<TextField
								size='small'
								sx={{ mt: '2vh', minWidth: '12vw', mr: '1rem' }}
								label='City'
								value={editForm.city}
								onChange={e =>
									setEditForm({ ...editForm, city: e.target.value })
								}
							></TextField>
							<TextField
								size='small'
								sx={{ mt: '2vh', minWidth: '12vw', mr: '1rem' }}
								label='Phone Number'
								value={editForm.phone_number}
								onChange={e =>
									setEditForm({ ...editForm, phone_number: e.target.value })
								}
							></TextField>
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
						</Grid>
					</form>
				)}
				{profileEdit === false && (
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
								{currentUser.id == dev_id && currentUser.first_name && (
									<Grid item id='kebab' sx={{ justifySelf: 'flex-end' }}>
										<ProfileMenu
											setModalData={setModalData}
											openModal={openModal}
											setOpenModal={setOpenModal}
											setProfileView={setProfileView}
											profileView={profileView}
										/>
									</Grid>
								)}
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
								<h4 className='prof-header-txt'>
									<sub>
										<LocationOnIcon />{' '}
									</sub>
									{city}
								</h4>
							</Grid>
							<Grid item>
								<h4 className='prof-header-txt'>
									<sub>
										<PhoneIcon />{' '}
									</sub>
									{phone_number}
								</h4>
							</Grid>
							<Grid item>
								<h4 className='prof-header-txt'>
									<sub>
										<Email />{' '}
									</sub>
									{email}
								</h4>
							</Grid>
							{currentUser.id == dev_id && currentUser.first_name && (
								<Grid
									item
									className='profile-buttons'
									sx={{ justifyContent: 'space-evenly', mb: '1rem' }}
								>
									<Chip onClick={e => editProfile()} label='Edit Info' />
								</Grid>
							)}
						</Grid>
					</Grid>
				)}
			</Grid>
		</>
	);
}
