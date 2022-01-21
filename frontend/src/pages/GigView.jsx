import './styles/LandingPage.scss';
import { Link } from 'react-router-dom';
import { TextField, Button, Modal, Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import LoginForm from '../components/LoginForm';
import axios from 'axios';

import ApplyModal from '../components/SearchResults/ApplyModal';
import { UserContext } from '../Providers/userProvider';

export default function LandingPage(props) {
	const { currentUser } = useContext(UserContext);
	const [open, setOpen] = useState(false);
	const { gig_id } = useParams();
	const [gigPosting, setGigPosting] = useState('');

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

	const handleView = () => {
		open === true ? setOpen(false) : setOpen(true);
	};

	const style = {
		width: 1 / 2,
		height: 1 / 2,
		display: 'flex',
		flexDirection: 'column',
		margin: '10% 0 0 25%',
		background: '#223d55',
		color: 'black',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: '2rem',
	};

	return (
		<div className='gig-content'>
			<h1>{gigPosting.job_title}</h1>
			<img src={gigPosting.photo_url} />
			<h2>Description</h2>
			<p>{gigPosting.description}</p>
			<p>
				Deadline:{' '}
				{new Date(gigPosting.deadline).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				})}
			</p>
			<p>Offer: {`$${gigPosting.pay / 100} CAD`}</p>

			<ApplyModal currentUser={currentUser} jobApplying={gigPosting} />
		</div>
	);
}
