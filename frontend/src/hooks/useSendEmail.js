import axios from 'axios';
import './styles/TestApplications.scss';

export default function useSendEmail(emailData) {
	const { email, currentUser, job_title } = emailData;

	const email = () => {
		axios
			.post('/send_email', {
				params: {
					to: email,
					from: 'applyjuniorstacks@gmail.com', // Use the email address or domain you verified
					subject: `${job_title}: New Application From ${currentUser.first_name} ${currentUser.last_name}`,
					text: `You've got a new application on Junior Stacks!`,
					html: '<strong>and easy to do anywhere, even with Node.js</strong>',
				},
			})
			.then(res => {
				console.log('yay!');
			})
			.catch(err => console.log(err));
	};

	email();
}
