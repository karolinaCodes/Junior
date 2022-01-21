import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import './styles/TestApplications.scss';

export default function ApplicationsTest(props) {
	const { currentUser } = props;
	const [accepted, setAccepted] = useState('');

	/* ACCEPT APPLICATIONS
	this should be the APPLICATION ID
	const id = 2;

	useEffect(() => {
		const getApplications = () => {
			axios
				.post(`/api/job_applications/accept/${id}`, {
					params: {
						id: id,
					},
				})
				.then(res => {
					console.log(res.data);
					setAccepted(res.data);
				})
				.catch(err => {
					console.log(err);
				});
		};
		getApplications();
	}, []);
	const showApps = accepted.map(item => {
			return <h1>{item}</h1>;
		});
		*/

	useEffect(() => {
		/*
  		params is an object containing the mail keys:
  		to: 'test@example.com',
  		from: 'test@example.com', // Use the email address or domain you verified above
  		subject: 'Sending with Twilio SendGrid is Fun',
  		text: 'and easy to do anywhere, even with Node.js',
  		html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  	*/

		const email = () => {
			axios
				.post('/send_email', {
					params: {
						to: 'creativereyne@gmail.com',
						from: 'applyjuniorstacks@gmail.com', // Use the email address or domain you verified above
						subject: 'Sending with Twilio SendGrid is Fun',
						text: 'and easy to do anywhere, even with Node.js',
						html: '<strong>and easy to do anywhere, even with Node.js</strong>',
					},
				})
				.then(res => {
					console.log('yay!');
				})
				.catch(err => console.log(err));
		};

		email();
	}, []);

	return (
		<div id='test-apps'>
			<h1>Applications:</h1>
			{/* <h2>{currentUser.id}</h2>
			<h2>{accepted.id}</h2> */}
		</div>
	);
}
