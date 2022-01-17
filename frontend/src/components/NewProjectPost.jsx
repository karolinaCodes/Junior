import './styles/NewProjectPost.scss';

import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

export default function NewProjectPost(props) {
	const { currentUser } = props;
	const [form, setForm] = useState({
		junior_dev_id: null,
		title: '',
		description: '',
		thumbnail_photo_url: '',
		github_link: '',
		live_link: '',
		original_request: '',
	});

	const postProject = e => {
		e.preventDefault();

		setForm({
			junior_dev_id: currentUser.id,
			title: document.getElementById('project-name').value,
			description: document.getElementById('project-description').value,
			thumbnail_photo_url: document.getElementById('thumbnail-photo').value,
			github_link: document.getElementById('github-link').value,
			live_link: document.getElementById('live-link').value,
			original_request: document.getElementById('original-request').value,
		});

		console.log(form);

		axios
			.post('/api/projects/new', form)
			.then(res => {
				// setCurrentUser(res.data);
				console.log(res.data);
				setForm({
					junior_dev_id: null,
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
					onChange={e => setForm({ ...form, title: e.target.value })}
					value={form.title}
				/>
				<TextField
					id='github-link'
					sx={{ mt: '1rem' }}
					label='Github Link'
					variant='outlined'
					value={form.github_link}
					onChange={e => setForm({ ...form, github_link: e.target.value })}
				/>
				<TextField
					id='live-link'
					sx={{ mt: '1rem' }}
					label='Live Website Link'
					variant='outlined'
					value={form.live_link}
					onChange={e => setForm({ ...form, live_link: e.target.value })}
				/>
				<TextField
					id='thumbnail-photo'
					sx={{ mt: '1rem' }}
					label='Thumbnail Photo'
					variant='outlined'
					value={form.thumbnail_photo_url}
					onChange={e =>
						setForm({ ...form, thumbnail_photo_url: e.target.value })
					}
				/>
				<TextField
					id='project-description'
					sx={{ mt: '1rem' }}
					label='Project Description'
					variant='outlined'
					multiline={true}
					value={form.description}
					onChange={e => setForm({ ...form, description: e.target.value })}
				/>
				<TextField
					id='original-request'
					sx={{ mt: '1rem' }}
					label='Original Request'
					variant='outlined'
					multiline={true}
					value={form.original_request}
					onChange={e => setForm({ ...form, original_request: e.target.value })}
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
