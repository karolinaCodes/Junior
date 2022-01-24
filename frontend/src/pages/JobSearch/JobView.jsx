import '../styles/JobView.scss';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

// components
import ApplyModal from '../../components/JobSearch/ApplyModal';

// react-router
import { useParams, useNavigate } from 'react-router-dom';

// context
import { UserContext } from '../../Providers/userProvider';

// mui //
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const useStyles = makeStyles({
	back_btn: {
		color: '#182c5b',
		'border-color': '#182c5b',
	},
});

export default function LandingPage(props) {
	const { currentUser, savedJobsGigs, setSavedJobsGigs } =
		useContext(UserContext);
	const { jobs } = savedJobsGigs;
	const { job_id } = useParams();
	const [jobPosting, setJobPosting] = useState('');
	const [saved, setSaved] = useState(false);
	const navigate = useNavigate();
	const classes = useStyles();

	useEffect(() => {
		if (jobs) {
			jobs.filter(job => job.job_posting_id === +job_id).length &&
				setSaved(true);
		}
	}, [jobs]);

	useEffect(() => {
		// get job posting info
		axios
			.get(`/api/job_postings/${job_id}`)
			.then(res => {
				console.log(res.data);
				setJobPosting(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	const saveJob = () => {
		if (saved) {
			return navigate(`/dev/${currentUser.id}`, { state: 'saved' });
		}

		axios
			.post('/api/save/', {
				devId: currentUser.id,
				jobGigId: +job_id,
				jobType: 'job',
			})
			.then(res => {
				console.log(res.data);
				setSaved(true);
				setSavedJobsGigs(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<div className='gig-content page-container'>
			<div id='back-btn'>
				<Button
					variant='outlined'
					onClick={() => navigate(-1)}
					className={classes.back_btn}
				>
					Back To Results
				</Button>
			</div>
			<h1 className='jobview-job-title'>{jobPosting.job_title}</h1>
			<div className='job-details-logos'>
				<div>
					{' '}
					<WorkOutlineOutlinedIcon />
					<span>{jobPosting.is_remote ? 'Remote' : jobPosting.city}</span>
				</div>
				<div>
					<FmdGoodOutlinedIcon />
					<span>{jobPosting.job_type}</span>
				</div>
				<div>
					<LocalOfferOutlinedIcon />
					<span>${jobPosting.salary}</span>
				</div>
			</div>
			<span className='posted-on'>
				<em>
					Posted{' '}
					{new Date(jobPosting.date_posted).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})}
				</em>
			</span>
			<img src={jobPosting.photo_url} />
			<div className='job-desc-container'>
				<div className='job-desc-img-pic'>
					<div className='job-desc'>
						<div>
							<h3 id='desc-label'>About {jobPosting.company_name}</h3>
							<p className='desc-text'>{jobPosting.company_desc}</p>
						</div>

						<div>
							<h3 id='desc-label'>About the Role</h3>
							<p className='desc-text'>{jobPosting.description}</p>
						</div>

						<div>
							<h3 id='desc-label'>Key Responsibilities</h3>
							<p className='desc-text'>{jobPosting.responsibilities}</p>
						</div>

						<div>
							<h3 id='desc-label'>Qualifications</h3>
							<p className='desc-text'>
								{jobPosting && jobPosting.qualifications}
							</p>
						</div>

						<div>
							<h3 id='desc-label'>Benefits</h3>
							<p className='desc-text'>{jobPosting.benefits}</p>
						</div>
					</div>

					<div className='employer-pic-container'>
						<img src={jobPosting.employer_photo_url} className='job-desc-img' />
						<p id='posting-company-name'>
							<b>{jobPosting.company_name} </b>
						</p>
					</div>
				</div>
				<div className='posting-btn-container'>
					<ApplyModal currentUser={currentUser} jobApplying={jobPosting} />
					<Button
						variant={saved ? 'contained' : 'outlined'}
						color={saved ? 'success' : 'primary'}
						onClick={saveJob}
					>
						{saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}{' '}
						{saved ? 'SAVED' : 'Save'}
					</Button>
				</div>
			</div>
		</div>
	);
}
