import '../styles/GigView.scss';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ApplyModal from '../../components/JobSearch/ApplyModal';
import { UserContext } from '../../Providers/userProvider';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

export default function LandingPage(props) {
	const { currentUser, savedJobsGigs, setSavedJobsGigs } =
		useContext(UserContext);
	const { gigs } = savedJobsGigs;
	const { gig_id } = useParams();
	const [gigPosting, setGigPosting] = useState('');
	const [saved, setSaved] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (gigs) {
			gigs.filter(gig => gig.gig_posting_id === +gig_id).length &&
				setSaved(true);
		}
	}, [gigs]);

	// useEffect(() => {
	// 	if (currentUser) {
	// 		axios
	// 			.get(`/api/save/${currentUser.id}`)
	// 			.then(res => {
	// 				setSavedJobsGigs(res.data);
	// 			})
	// 			.catch(err => {
	// 				console.log(err);
	// 			});
	// 	}
	// }, []);

	useEffect(() => {
		axios
			.get(`/api/gig_postings/${gig_id}`)
			.then(res => {
				console.log(res.data);
				setGigPosting(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	const saveGig = () => {
		if (saved) {
			return navigate('/saved');
		}

		axios
			.post('/api/save/', {
				devId: currentUser.id,
				jobGigId: +gig_id,
				jobType: 'gig',
			})
			.then(res => {
				console.log(res.data);
				setSaved(true);
				axios
					.get(`/api/save/${currentUser.id}`)
					.then(res => {
						setSavedJobsGigs(res.data);
					})
					.catch(err => {
						console.log(err);
					});
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<div className='content-container'>
			<div className='gig-content'>
				<h1 id='gig-jobtitle'>{gigPosting.job_title}</h1>
				<p>
					<em>Posted on January 30, 2022</em>
				</p>
				<div className='gig-img-container'>
					{gigPosting &&
						gigPosting.gig_images.map((image, index) => (
							<img key={index} src={image.photo_url} className='gig-img' />
						))}
				</div>
				<div id='gig-bottom-content'>
					<h2 id='gig-desc-label'>Description</h2>
					<p className='gig-desc'>{gigPosting.description}</p>
					<p>
						<b>Offer: {`$${gigPosting.pay / 100} CAD`} </b>
					</p>
					<p>
						<b>
							Deadline:{' '}
							{new Date(gigPosting.deadline).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}{' '}
						</b>
					</p>
					<div className='posting-btn-container'>
						<ApplyModal currentUser={currentUser} jobApplying={gigPosting} />
						<Button
							variant={saved ? 'contained' : 'outlined'}
							color={saved ? 'success' : 'primary'}
							onClick={saveGig}
						>
							{saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}{' '}
							{saved ? 'SAVED' : 'Save'}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
