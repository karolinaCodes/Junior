import { useContext, useState } from 'react';
import './styles/NewJobPost.scss';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
	Button,
	TextField,
	FormControlLabel,
	Switch,
	MenuItem,
	Grid,
} from '@mui/material';
import { useEffect } from 'react';
import { maxWidth } from '@mui/system';
import { UserContext } from '../Providers/userProvider';

export default function NewJobPost(props) {
	const { setOpenModal } = props;
	const { currentUser } = useContext(UserContext);
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

	const handleClose = () => {
		setOpenModal(false);
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
					salary: '',
					job_type: 'Full-Time',
					is_remote: false,
					is_open: true,
				});
				handleClose();
			})
			.catch(err => {
				console.log(err);
			});
	};

	const navigate = useNavigate();

	return (
		<form className='new-job-form' onSubmit={postJob}>
			<h1>{jobForm.job_title}</h1>
			<img src={currentUser.photo_url} />
			<TextField
				id='new-job-title'
				label='Job Title'
				fullWidth
				sx={{ backgroundColor: '#f6fafd' }}
				variant='filled'
				onChange={e => setJobForm({ ...jobForm, job_title: e.target.value })}
				value={jobForm.job_title}
			/>
			<div id='city-salary'>
				<Grid
					container
					direction='row'
					id='first-row'
					gap={5}
					sx={{ mt: '1rem' }}
				>
					<Grid item xs>
						<TextField
							fullWidth
							id='city'
							sx={{ backgroundColor: '#f6fafd' }}
							label='City'
							variant='filled'
							multiline={true}
							value={jobForm.city}
							onChange={e => setJobForm({ ...jobForm, city: e.target.value })}
						/>
					</Grid>
					<Grid item xs>
						<TextField
							fullWidth
							id='salary'
							sx={{ backgroundColor: '#f6fafd' }}
							label='Yearly Salary'
							variant='filled'
							type='number'
							value={jobForm.salary}
							onChange={e => {
								setJobForm({ ...jobForm, salary: e.target.value });
							}}
						/>
					</Grid>
				</Grid>
			</div>
			<div id='bottom-row'>
				<TextField
					fullWidth
					id='job-description'
					color='primary'
					sx={{ backgroundColor: '#f6fafd' }}
					label='Job Description'
					variant='filled'
					multiline={true}
					minRows={10}
					maxRows={10}
					value={jobForm.description}
					onChange={e =>
						setJobForm({ ...jobForm, description: e.target.value })
					}
				/>
				<div id='remote-type'>
					<TextField
						fullWidth
						id='job-type'
						label='Job Type'
						variant='filled'
						sx={{ backgroundColor: '#f6fafd', mb: '2rem' }}
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
						sx={{ color: '#f6fafd' }}
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
					onClick={e => {
						handleClose();
					}}
					variant='outlined'
					size='large'
				>
					Cancel
				</Button>
			</div>
		</form>
	);
}
