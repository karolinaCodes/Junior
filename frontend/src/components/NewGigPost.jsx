import './styles/NewGigPost.scss';

import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NewGigPost(props) {
	const { currentUser } = props;
	const [gigForm, setGigForm] = useState({
		employer_id: currentUser.id,
		job_title: '',
		description: '',
		pay: '',
		deadline: '',
		photo_url: '',
	});

	const postGig = e => {
		e.preventDefault();

		axios
			.post('/api/gig_postings/new', gigForm)
			.then(res => {
				console.log(res.data);
				setGigForm({
					employer_id: currentUser.id,
					job_title: '',
					description: '',
					pay: '',
					deadline: '',
					photo_url: '',
				});
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<div className='new-gig-content'>
			<form className='new-gig-form' onSubmit={postGig}>
				<h1>New Gig:</h1>
				<TextField
					id='gig-name'
					label='Gig Name'
					variant='outlined'
					onChange={e => setGigForm({ ...gigForm, job_title: e.target.value })}
					value={gigForm.job_title}
				/>
				<TextField
					id='pay'
					sx={{ mt: '1rem' }}
					label='Pay'
					variant='outlined'
					type='number'
					value={gigForm.pay}
					onChange={e => setGigForm({ ...gigForm, pay: e.target.value })}
				/>
				<TextField
					id='deadline'
					sx={{ mt: '1rem' }}
					label='Deadline'
					variant='outlined'
					value={gigForm.deadline}
					onChange={e => setGigForm({ ...gigForm, deadline: e.target.value })}
				/>
				<TextField
					id='photo-url'
					sx={{ mt: '1rem' }}
					label='Thumbnail Photo'
					variant='outlined'
					value={gigForm.photo_url}
					onChange={e => setGigForm({ ...gigForm, photo_url: e.target.value })}
				/>
				<TextField
					id='gig-description'
					sx={{ mt: '1rem' }}
					label='Gig Description'
					variant='outlined'
					multiline={true}
					value={gigForm.description}
					onChange={e =>
						setGigForm({ ...gigForm, description: e.target.value })
					}
				/>
				<div>
					{/* <Button variant='contained' size='large' type='submit' onClick={null}>
						Upload Images
					</Button> */}
					<Button
						id='post-gig'
						variant='contained'
						size='large'
						type='submit'
						onClick={null}
					>
						Post Gig
					</Button>
					<Button
						id='cancel-gig'
						component={Link}
						to='/profile'
						variant='contained'
						size='large'
					>
						Cancel
					</Button>
				</div>
			</form>
		</div>
	);
}
