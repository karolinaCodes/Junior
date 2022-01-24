import './styles/UserProfileHeader.scss';

import { Chip, Grid, Input, TextField } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { minHeight } from '@mui/system';
import { useContext } from 'react';
import { UserContext } from '../Providers/userProvider';
import { useEffect } from 'react';

export default function UserProfileHeader(props) {
	const { currentUser, setCurrentUser } = useContext(UserContext);
	const [profileView, setProfileView] = useState('browse');
	const [editForm, setEditForm] = useState({
		...currentUser,
	});

	useEffect(() => {
		setEditForm(prev => ({ ...prev, ...currentUser }));
	}, [currentUser]);

	const {
		resume_url,
		github_url,
		linkedin_url,
		bio,
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
		<Grid container className='profile-bio' direction='column'>
			<Grid item className='profile-pic'>
			</Grid>
			{profileView === 'edit' && (
				<form onSubmit={editProfile}>
					<Grid item className='profile-links'>
						<TextField
							size='small'
							multiline={true}
							maxRows={3}
							sx={{ mt: '2vh', minWidth: '12vw' }}
							label='Bio'
							value={editForm.bio}
							onChange={e => setEditForm({ ...editForm, bio: e.target.value })}
						></TextField>
						<TextField
							size='small'
							sx={{ mt: '2vh', minWidth: '12vw' }}
							label='Resume'
							value={editForm.resume_url}
							onChange={e =>
								setEditForm({ ...editForm, resume_url: e.target.value })
							}
						></TextField>
						<TextField
							size='small'
							sx={{ mt: '2vh', minWidth: '12vw' }}
							label='GitHub'
							value={editForm.github_url}
							onChange={e =>
								setEditForm({ ...editForm, github_url: e.target.value })
							}
						></TextField>
						<TextField
							size='small'
							sx={{ mt: '2vh', mb: '2vh', minWidth: '12vw' }}
							label='LinkedIn'
							value={editForm.linkedin_url}
							onChange={e =>
								setEditForm({ ...editForm, linkedin_url: e.target.value })
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
				<>
					<Grid item className='profile-links'>
						<h4>{bio ? bio : 'N/A'}</h4>
						<h4>
							<a href={resume_url}>Resume</a>
						</h4>
						<h4>{github_url ? github_url : 'N/A'}</h4>
						<h4>{linkedin_url ? linkedin_url : 'N/A'}</h4>
					</Grid>
					<Grid
						item
						className='profile-buttons'
						sx={{ justifyContent: 'space-evenly' }}
					>
						<Chip onClick={e => editProfile()} label='Edit Profile' />
					</Grid>
				</>
			)}
		</Grid>
	);
}
