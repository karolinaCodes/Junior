import './styles/LoginForm.scss';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';

const testUser = {
	id: null,
	first_name: String,
	last_name: String,
	email: String,
	password: String,
	bio: String,
	photo_url: String,
	github_url: String,
	linkedIn_url: String,
	resume_url: String,
	location: String,
	company_name: String,
};

export default function Login(props) {
	const { handleLoginView, currentUser, setCurrentUser } = props;
	// // FOR EXAMPLE LOGIN FUNCTIONALITY
	// const {currentUser, setCurrentUser} = useState();

	// // EXAMPLE LOGIN FUNCTIONALITY
	const login = e => {
		e.preventDefault();

		const data = {
			email: document.getElementById('email').value,
			password: document.getElementById('password').value,
		};

		console.log(data);

		axios
			.post('/api/login', data)
			.then(res => {
				setCurrentUser(res.data);
				console.log(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<div className='login-content'>
			<form className='login' onSubmit={login}>
				<h1>Log in to your account</h1>
				<h2>Log in now to blah blah blah blah blah blah blah</h2>
				<TextField id='email' label='email' variant='outlined' />
				<TextField
					id='password'
					sx={{ mt: '1rem' }}
					label='password'
					type='password'
					variant='outlined'
				/>
				<div>
					<Button
						variant='contained'
						size='large'
						type='submit'
						onClick={e => console.log('USER:', currentUser)}
					>
						LOG IN
					</Button>
					<Button
						id='cancelLogin'
						variant='contained'
						size='large'
						onClick={handleLoginView}
					>
						Cancel
					</Button>
					<p>
						Not registered yet? <a href='/sign-up'>Create an account</a>
					</p>
				</div>
			</form>
		</div>
	);
}
