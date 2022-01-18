import { useState } from 'react';
import './styles/NewJobPost.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, TextField, FormControlLabel, Switch } from '@mui/material';

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

/* 
	interface Job_posting {
	id: Int;
	employer_id: Int;
	job_title: String;
	description: String;
	city: String;
	salary_min: Int;
	salary_max: Int;
	type: String; // full-time, part-time, internship, gig
	is_remote: Boolean;
	date_posted: Timestamp;
	is_open: Boolean; // if the position is still open
}
*/

export default function NewGigPost(props) {
	const { currentUser } = props;
	const [jobForm, setJobForm] = useState({
		employer_id: currentUser.id,
		job_title: '',
		description: '',
		city: '',
		salary_min: '',
		salary_max: '',
		type: '',
		is_remote: false,
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
					city: '',
					salary_min: 0,
					salary_max: 0,
					type: '',
					is_remote: false,
				});
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<div className='new-job-content'>
			<form className='new-job-form' onSubmit={postGig}>
				<h1>New Job:</h1>
				<TextField
					id='job-title'
					label='Job Title'
					variant='outlined'
					onChange={e => setJobForm({ ...jobForm, job_title: e.target.value })}
					value={jobForm.job_title}
				/>
				<div>
					<TextField
						id='salary-min'
						sx={{ mt: '1rem' }}
						label='Salary Min'
						variant='outlined'
						type='number'
						value={jobForm.salary_min}
						onChange={e => {
							setJobForm({ ...jobForm, salary_min: e.target.value });
						}}
					/>
					<TextField
						id='salary-max'
						sx={{ mt: '1rem' }}
						label='Salary Max'
						variant='outlined'
						type='number'
						value={jobForm.salary_max}
						onChange={e => {
							setJobForm({ ...jobForm, salary_max: e.target.value });
						}}
					/>
				</div>
				<TextField
					id='type'
					sx={{ mt: '1rem' }}
					label='Job Type'
					variant='outlined'
					value={jobForm.type}
					onChange={e => {
						setJobForm({ ...jobForm, type: e.target.value });
					}}
				/>
				<FormControlLabel
					id='remote-switch'
					control={<Switch defaultChecked={false} />}
					label='Remote Position'
					onChange={e => {
						if (!jobForm.is_remote) {
							setJobForm({ ...jobForm, is_remote: true });
						} else {
							setJobForm({ ...jobForm, is_remote: false });
						}
					}}
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
