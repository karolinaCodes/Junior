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
				<h1>Login:</h1>
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
				</div>
			</form>
		</div>
	);
}
