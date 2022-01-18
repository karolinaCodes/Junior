import { useState } from 'react';
import './styles/NewJobPost.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
	Button,
	TextField,
	FormControlLabel,
	Switch,
	MenuItem,
} from '@mui/material';

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

export default function NewJobPost(props) {
	const { currentUser } = props;
	const [jobForm, setJobForm] = useState({
		employer_id: currentUser.id,
		job_title: '',
		description: '',
		city: '',
		salary_min: '',
		salary_max: '',
		job_type: 'Full-Time',
		is_remote: false,
	});

	const isRemote = e => {
		if (!jobForm.is_remote) {
			setJobForm({ ...jobForm, is_remote: true });
		} else {
			setJobForm({ ...jobForm, is_remote: false });
		}
	};

	const postJob = e => {
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
					salary_min: '',
					salary_max: '',
					job_type: 'Full-Time',
					is_remote: false,
				});
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<div className='new-job-content'>
			<form className='new-job-form' onSubmit={postJob}>
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
					id='job-type'
					label='Job Type'
					value={jobForm.job_type}
					select
					onChange={e => {
						setJobForm({ ...jobForm, job_type: e.target.value });
					}}
				>
					<MenuItem value='Full-Time'>Full-Time</MenuItem>
					<MenuItem value='Part-Time'>Part-Time</MenuItem>
				</TextField>
				<FormControlLabel
					id='remote-switch'
					control={<Switch default value={jobForm.is_remote} />}
					label='Remote Position'
					onChange={e => isRemote(e)}
				/>
				<Button onClick={e => console.log(jobForm.type)}>CLick</Button>
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
				<TextField
					id='city'
					sx={{ mt: '1rem' }}
					label='city'
					variant='outlined'
					multiline={true}
					value={jobForm.city}
					onChange={e => setJobForm({ ...jobForm, city: e.target.value })}
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
						Post Job
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
