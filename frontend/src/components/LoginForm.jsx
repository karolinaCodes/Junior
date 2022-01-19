import './styles/LoginForm.scss';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login(props) {
	const { handleLoginView, currentUser, setCurrentUser } = props;

	const navigate = useNavigate();

	const login = e => {
		e.preventDefault();

		const data = {
			email: document.getElementById('email').value,
			password: document.getElementById('password').value,
		};

		axios
			.post('/api/auth/login', data)
			.then(res => {
				setCurrentUser(res.data);
				setTimeout(() => {
					navigate('/profile');
				}, 1000);
				console.log(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	};

	useEffect(() => {
		handleLoginView();
	}, [currentUser]);

	return (
		<div className='login-content'>
			<form className='login' onSubmit={login}>
				<div className='login-text'>
					<h1>Log in to your account</h1>
					<h2>
						Log in now to get started building your portolfio and building your
						career
					</h2>
				</div>
				<TextField id='email' label='email' />
				<TextField
					id='password'
					sx={{ mt: '1rem' }}
					label='password'
					type='password'
					variant='outlined'
				/>
				<Link className='forgot-password' to='/' onClick={handleLoginView}>
					Forgot password?
				</Link>
				<div>
					<Button
						variant='contained'
						size='large'
						type='submit'
						onClick={e => console.log('USER:', currentUser)}
					>
						LOG IN
					</Button>
					<p>
						Not registered yet? <Link to='/sign-up'>Create an account</Link>
					</p>
					<div className='login-footer'>
						<p>© 2020 Junior Stack. All rights reserved</p>
						<p className='tos-text'>
							<Link to='/' onClick={handleLoginView}>
								Terms of Service
							</Link>{' '}
							-{' '}
							<Link to='/' onClick={handleLoginView}>
								Privacy Policy
							</Link>
						</p>
					</div>
				</div>
			</form>
		</div>
	);
}
