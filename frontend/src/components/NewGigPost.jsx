import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, FormLabel } from '@mui/material';

import './styles/NewGigPost.scss';

export default function NewGigPost(props) {
	const { currentUser } = props;
	const [gigForm, setGigForm] = useState({
		employer_id: currentUser.id,
		job_title: 'New Gig',
		description: '',
		pay: '',
		deadline: '',
		photo_url: '',
	});

	useEffect(() => {
		setGigForm({ ...gigForm, employer_id: currentUser.id });
	}, [currentUser]);

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
				<h1>{gigForm.job_title}</h1>
				<TextField
					id='gig-name'
					sx={{ minWidth: '80%' }}
					label='Gig Name'
					variant='outlined'
					onChange={e => setGigForm({ ...gigForm, job_title: e.target.value })}
					value={gigForm.job_title}
				/>
				<div id='pay-photo'>
					<TextField
						id='photo-url'
						sx={{
							ml: '2rem',
						}}
						label='Thumbnail Photo'
						variant='outlined'
						value={gigForm.photo_url}
						onChange={e =>
							setGigForm({ ...gigForm, photo_url: e.target.value })
						}
					/>
					<TextField
						id='pay'
						sx={{ ml: '1rem' }}
						label='Pay'
						variant='outlined'
						type='number'
						value={gigForm.pay}
						onChange={e => setGigForm({ ...gigForm, pay: e.target.value })}
					/>
					<TextField
						id='deadline'
						helperText='Deadline'
						sx={{ ml: '1rem', mr: '2rem', mb: 0 }}
						type='date'
						variant='outlined'
						value={gigForm.deadline}
						onChange={e => setGigForm({ ...gigForm, deadline: e.target.value })}
					/>
				</div>
				<TextField
					id='gig-description'
					sx={{
						minWidth: '80%',
					}}
					label='Gig Description'
					variant='outlined'
					multiline={true}
					minRows={5}
					value={gigForm.description}
					onChange={e =>
						setGigForm({ ...gigForm, description: e.target.value })
					}
				/>
				<div id='gig-buttons'>
					{/* <Button variant='contained' size='large' type='submit' onClick={null}>
						Upload Images
					</Button> */}
					<Button
						id='post-gig'
						sx={{ margin: 0 }}
						variant='contained'
						size='large'
						type='submit'
						onClick={null}
					>
						Post Gig
					</Button>
					<Button
						id='cancel-gig'
						sx={{ margin: 0 }}
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
