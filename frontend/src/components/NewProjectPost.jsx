import './styles/NewProjectPost.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Paper, Grid } from '@mui/material';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../Providers/userProvider';

export default function NewProjectPost(props) {
	const { setOpenModal } = props;
	const { currentUser, projectForm, setProjectForm } = useContext(UserContext);
	const { state } = useLocation();

	const handleClose = () => {
		setOpenModal(false);
	};

	console.log('IN PROJECT POST:', projectForm);

	const postProject = e => {
		e.preventDefault();

		axios
			.post('/api/projects/new', projectForm)
			.then(res => {
				setProjectForm({
					junior_dev_id: currentUser.id,
					title: 'New Project',
					description: '',
					thumbnail_photo_url: '',
					github_link: '',
					live_link: '',
					original_request: '',
				});
				handleClose();
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		// <div className='new-project-content'>
		<form className='new-project-form' onSubmit={postProject}>
			<h1>{projectForm.title}</h1>
			<img id='project-img' src={projectForm.thumbnail_photo_url} />
			<TextField
				id='project-name'
				label='Project Name'
				variant='filled'
				fullWidth
				sx={{ backgroundColor: '#f6fafd', mt: '1rem' }}
				onChange={e =>
					setProjectForm({ ...projectForm, title: e.target.value })
				}
				value={projectForm.title}
			/>
			<Grid
				container
				direction='row'
				id='first-row'
				xs={12}
				gap={5}
				sx={{ justifyContent: 'center', mt: '1rem' }}
			>
				<Grid item xs={3.6}>
					<TextField
						id='thumbnail-photo'
						sx={{
							backgroundColor: '#f6fafd',
						}}
						fullWidth
						label='Photo URL'
						variant='filled'
						value={projectForm.thumbnail_photo_url}
						onChange={e =>
							setProjectForm({
								...projectForm,
								thumbnail_photo_url: e.target.value,
							})
						}
					/>
				</Grid>
				<Grid item xs={3.6}>
					<TextField
						id='github-link'
						sx={{ backgroundColor: '#f6fafd' }}
						label='Github Link'
						variant='filled'
						fullWidth
						value={projectForm.github_link}
						onChange={e =>
							setProjectForm({ ...projectForm, github_link: e.target.value })
						}
					/>
				</Grid>
				<Grid item xs={3.6}>
					<TextField
						id='live-link'
						sx={{ backgroundColor: '#f6fafd' }}
						label='Live Website Link'
						variant='filled'
						fullWidth
						value={projectForm.live_link}
						onChange={e =>
							setProjectForm({ ...projectForm, live_link: e.target.value })
						}
					/>
				</Grid>
			</Grid>

			<TextField
				id='project-description'
				sx={{ mt: '1rem', width: '100%', backgroundColor: '#f6fafd' }}
				label='Project Description'
				variant='filled'
				multiline={true}
				minRows={5}
				value={projectForm.description}
				onChange={e =>
					setProjectForm({ ...projectForm, description: e.target.value })
				}
			/>
			<TextField
				id='original-request'
				sx={{
					mt: '1rem',
					mb: '1rem',
					minWidth: '80%',
					backgroundColor: '#f6fafd',
				}}
				label='Original Request'
				variant='filled'
				multiline={true}
				minRows={5}
				value={projectForm.original_request}
				onChange={e =>
					setProjectForm({
						...projectForm,
						original_request: e.target.value,
					})
				}
			/>

			<div id='project-buttons'>
				<Button
					id='post-project'
					sx={{ margin: 0 }}
					variant='contained'
					size='large'
					type='submit'
					onClick={null}
				>
					Post Project
				</Button>
				<Button
					id='cancel-project'
					sx={{ margin: 0 }}
					variant='outlined'
					size='large'
					onClick={e => {
						handleClose();
					}}
				>
					Cancel
				</Button>
			</div>
		</form>
		// </div>
	);
}
