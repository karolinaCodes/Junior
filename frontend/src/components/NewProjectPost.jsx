import './styles/NewProjectPost.scss';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function NewProjectPost(props) {
	const { currentUser } = props;
	const [projectForm, setProjectForm] = useState({
		junior_dev_id: currentUser.id,
		title: 'New Project',
		description: '',
		thumbnail_photo_url: '',
		github_link: '',
		live_link: '',
		original_request: '',
	});

	let navigate = useNavigate();

	useEffect(() => {
		setProjectForm({ ...projectForm, employer_id: currentUser.id });
	}, [currentUser]);

	const postProject = e => {
		e.preventDefault();

		axios
			.post('/api/projects/new', projectForm)
			.then(res => {
				// setCurrentUser(res.data);
				console.log(res.data);
				setProjectForm({
					junior_dev_id: currentUser.id,
					title: 'New Project',
					description: '',
					thumbnail_photo_url: '',
					github_link: '',
					live_link: '',
					original_request: '',
				});
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<div className='new-project-content'>
			<form className='new-project-form' onSubmit={postProject}>
				<h1>{projectForm.title}</h1>
				<TextField
					id='project-name'
					sx={{ minWidth: '80%' }}
					label='Project Name'
					variant='filled'
					onChange={e =>
						setProjectForm({ ...projectForm, title: e.target.value })
					}
					value={projectForm.title}
				/>
				<div id='first-row'>
					<TextField
						id='thumbnail-photo'
						sx={{
							mt: '1rem',
							ml: '2rem',
						}}
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
					<TextField
						id='github-link'
						sx={{ mt: '1rem', ml: '1rem' }}
						label='Github Link'
						variant='filled'
						value={projectForm.github_link}
						onChange={e =>
							setProjectForm({ ...projectForm, github_link: e.target.value })
						}
					/>
					<TextField
						id='live-link'
						sx={{ mt: '1rem', ml: '1rem', mr: '2rem' }}
						label='Live Website Link'
						variant='filled'
						value={projectForm.live_link}
						onChange={e =>
							setProjectForm({ ...projectForm, live_link: e.target.value })
						}
					/>
				</div>
				<div id='desc-section'>
					<TextField
						id='project-description'
						sx={{ mt: '1rem', minWidth: '37%' }}
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
							ml: '2rem',
							minWidth: '37%',
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
				</div>
				<div id='project-buttons'>
					<Button
						id='post-project'
						sx={{ margin: 0 }}
						variant='contained'
						size='large'
						type='submit'
						onClick={e => {
							navigate('/profile');
						}}
					>
						Post Project
					</Button>
					<Button
						id='cancel-project'
						sx={{ margin: 0 }}
						variant='contained'
						size='large'
						onClick={e => {
							navigate('/profile');
						}}
					>
						Cancel
					</Button>
				</div>
			</form>
		</div>
	);
}
