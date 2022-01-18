import { useState } from 'react';
import './styles/NewJobPost.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

// export default function NewJob(props) {
// 	useEffect(() => {
// 		axios
// 			.post('/api/job_applications/new', {
// 				job_posting_id: 1,
// 				junior_dev_id: 1,
// 			})
// 			.then(res => {
// 				console.log(res.data);
// 			})
// 			.catch(err => {
// 				console.log(err);
// 			});
// 	});

// 	return (
// 		<div className='new-job-content'>
// 			<div></div>
// 		</div>
// 	);
// }

export default function NewGigPost(props) {
	const { currentUser } = props;
	const [jobForm, setJobForm] = useState({
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
			.post('/api/job_postings/new', jobForm)
			.then(res => {
				console.log(res.data);
				setJobForm({
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
		<div className='new-job-content'>
			<form className='new-job-form' onSubmit={postGig}>
				<h1>New Gig:</h1>
				<TextField
					id='job-name'
					label='Gig Name'
					variant='outlined'
					onChange={e => setJobForm({ ...jobForm, job_title: e.target.value })}
					value={jobForm.job_title}
				/>
				<TextField
					id='pay'
					sx={{ mt: '1rem' }}
					label='Pay'
					variant='outlined'
					type='number'
					value={jobForm.pay}
					onChange={e => setJobForm({ ...jobForm, pay: e.target.value })}
				/>
				<TextField
					id='deadline'
					sx={{ mt: '1rem' }}
					label='Deadline'
					variant='outlined'
					value={jobForm.deadline}
					onChange={e => setJobForm({ ...jobForm, deadline: e.target.value })}
				/>
				<TextField
					id='photo-url'
					sx={{ mt: '1rem' }}
					label='Thumbnail Photo'
					variant='outlined'
					value={jobForm.photo_url}
					onChange={e => setJobForm({ ...jobForm, photo_url: e.target.value })}
				/>
				<TextField
					id='job-description'
					sx={{ mt: '1rem' }}
					label='Job Description'
					variant='outlined'
					multiline={true}
					value={jobForm.description}
					onChange={e =>
						setJobForm({ ...jobForm, description: e.target.value })
					}
				/>
				<div>
					{/* <Button variant='contained' size='large' type='submit' onClick={null}>
						Upload Images
					</Button> */}
					<Button
						id='post-job'
						variant='contained'
						size='large'
						type='submit'
						onClick={null}
					>
						Post Gig
					</Button>
					<Button
						id='cancel-job'
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
