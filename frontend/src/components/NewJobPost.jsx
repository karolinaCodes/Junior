import { useState } from 'react';
import './styles/NewJobPost.scss';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
	Button,
	TextField,
	FormControlLabel,
	Switch,
	MenuItem,
} from '@mui/material';
import { useEffect } from 'react';
import { maxWidth } from '@mui/system';

export default function NewJobPost(props) {
	const { currentUser } = props;
	const [jobForm, setJobForm] = useState({
		employer_id: currentUser.id,
		job_title: 'Job Title',
		description: '',
		city: '',
		salary: '',
		job_type: 'Full-Time',
		is_remote: false,
		is_open: true,
	});

	useEffect(() => {
		setJobForm({ ...jobForm, employer_id: currentUser.id });
	}, [currentUser]);

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
					job_title: 'Job Title',
					description: '',
					city: '',
					salary_min: '',
					salary_max: '',
					job_type: 'Full-Time',
					is_remote: false,
					is_open: true,
				});
			})
			.catch(err => {
				console.log(err);
			});
	};

	const navigate = useNavigate();

	return (
		<div className='new-job-content'>
			<form className='new-job-form' onSubmit={postJob}>
				<h1>{jobForm.job_title}</h1>
				<TextField
					id='job-title'
					label='Job Title'
					sx={{ minWidth: '80%' }}
					variant='outlined'
					onChange={e => setJobForm({ ...jobForm, job_title: e.target.value })}
					value={jobForm.job_title}
				/>
				<div id='city-salary'>
					<TextField
						id='city'
						sx={{ mt: '1rem', minWidth: '38%' }}
						label='city'
						variant='outlined'
						multiline={true}
						value={jobForm.city}
						onChange={e => setJobForm({ ...jobForm, city: e.target.value })}
					/>
					<TextField
						id='salary'
						sx={{ mt: '1rem', ml: '2rem', minWidth: '38%' }}
						label='Yearly Salary'
						variant='outlined'
						type='number'
						value={jobForm.salary}
						onChange={e => {
							setJobForm({ ...jobForm, salary: e.target.value });
						}}
					/>
				</div>
				<div id='bottom-row'>
					<TextField
						id='job-description'
						sx={{ mt: '1rem', flexGrow: 1 }}
						label='Job Description'
						variant='outlined'
						multiline={true}
						minRows={5}
						maxRows={5}
						value={jobForm.description}
						onChange={e =>
							setJobForm({ ...jobForm, description: e.target.value })
						}
					/>
					<div id='remote-type'>
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
							<MenuItem value='Internship'>Internship</MenuItem>
						</TextField>
						<FormControlLabel
							id='remote-switch'
							control={<Switch default value={jobForm.is_remote} />}
							sx={{ mt: '2rem' }}
							label='Remote Position'
							onChange={e => isRemote(e)}
						/>
					</div>
				</div>

				<div id='gig-buttons'>
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
						onClick={e => navigate('/profile')}
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
