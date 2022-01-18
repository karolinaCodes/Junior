import './styles/NewProjectPost.scss';

import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

export default function NewProjectPost(props) {
	const { currentUser } = props;
	const [projectForm, setProjectForm] = useState({
		junior_dev_id: currentUser.id,
		title: '',
		description: '',
		thumbnail_photo_url: '',
		github_link: '',
		live_link: '',
		original_request: '',
	});

	const postProject = e => {
		e.preventDefault();

		axios
			.post('/api/projects/new', projectForm)
			.then(res => {
				// setCurrentUser(res.data);
				console.log(res.data);
				setProjectForm({
					junior_dev_id: currentUser.id,
					title: '',
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
				<h1>New Project:</h1>
				<TextField
					id='project-name'
					label='Project Name'
					variant='outlined'
					onChange={e =>
						setProjectForm({ ...projectForm, title: e.target.value })
					}
					value={projectForm.title}
				/>
				<TextField
					id='github-link'
					sx={{ mt: '1rem' }}
					label='Github Link'
					variant='outlined'
					value={projectForm.github_link}
					onChange={e =>
						setProjectForm({ ...projectForm, github_link: e.target.value })
					}
				/>
				<TextField
					id='live-link'
					sx={{ mt: '1rem' }}
					label='Live Website Link'
					variant='outlined'
					value={projectForm.live_link}
					onChange={e =>
						setProjectForm({ ...projectForm, live_link: e.target.value })
					}
				/>
				<TextField
					id='thumbnail-photo'
					sx={{ mt: '1rem' }}
					label='Thumbnail Photo'
					variant='outlined'
					value={projectForm.thumbnail_photo_url}
					onChange={e =>
						setProjectForm({
							...projectForm,
							thumbnail_photo_url: e.target.value,
						})
					}
				/>
				<TextField
					id='project-description'
					sx={{ mt: '1rem' }}
					label='Project Description'
					variant='outlined'
					multiline={true}
					value={projectForm.description}
					onChange={e =>
						setProjectForm({ ...projectForm, description: e.target.value })
					}
				/>
				<TextField
					id='original-request'
					sx={{ mt: '1rem' }}
					label='Original Request'
					variant='outlined'
					multiline={true}
					value={projectForm.original_request}
					onChange={e =>
						setProjectForm({ ...projectForm, original_request: e.target.value })
					}
				/>
				<div>
					{/* <Button variant='contained' size='large' type='submit' onClick={null}>
						Upload Images
					</Button> */}
					<Button
						id='post-project'
						variant='contained'
						size='large'
						type='submit'
						onClick={null}
					>
						Post Project
					</Button>
					<Button
						id='cancel-project'
						variant='contained'
						size='large'
						onClick={null}
					>
						Cancel
					</Button>
				</div>
			</form>
		</div>
	);
}
