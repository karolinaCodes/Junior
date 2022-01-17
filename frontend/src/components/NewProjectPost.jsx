import './styles/NewProjectPost.scss';

import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';

export default function NewProjectPost(props) {
	const { currentUser } = props;

	const postGig = e => {
		e.preventDefault();

		const data = {
			junior_dev_id: null,
			title: document.getElementById('project-name').value,
			description: document.getElementById('project-description').value,
			thumbnail_photo_url: document.getElementById('thumbnail-photo').value,
			github_link: document.getElementById('github-link').value,
			live_link: document.getElementById('live-link').value,
			original_request: document.getElementById('original-request').value,
		};

		console.log(data);

		axios
			.post('/api/projects/new', data)
			.then(res => {
				// setCurrentUser(res.data);
				console.log(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<div className='new-gig-content'>
			<form className='new-gig-form' onSubmit={null}>
				<h1>New Project:</h1>
				<TextField id='project-name' label='Project Name' variant='outlined' />
				<TextField
					id='github-link'
					sx={{ mt: '1rem' }}
					label='Github Link'
					variant='outlined'
				/>
				<TextField
					id='live-link'
					sx={{ mt: '1rem' }}
					label='Live Website Link'
					variant='outlined'
				/>
				<TextField
					id='thumbnail-photo'
					sx={{ mt: '1rem' }}
					label='Thumbnail Photo'
					variant='outlined'
				/>
				<TextField
					id='project-description'
					sx={{ mt: '1rem' }}
					label='Project Description'
					variant='outlined'
					multiline={true}
				/>
				<TextField
					id='original-request'
					sx={{ mt: '1rem' }}
					label='Original Request'
					variant='outlined'
					multiline={true}
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
						id='cancel-post'
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
