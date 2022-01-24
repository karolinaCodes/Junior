import './styles/LoginForm.scss';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Providers/userProvider';

export default function Login(props) {
	const { handleLoginView } = props;
	const { currentUser, setCurrentUser } = useContext(UserContext);

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
				console.log(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	};

	useEffect(() => {
		if (currentUser.company_name) {
			navigate(`/employer/${currentUser.id}`);
		} else {
			navigate(`/dev/${currentUser.id}`);
		}
		handleLoginView();
	}, [currentUser]);

	return (
		<div>
			<div id='login-box'>
				<form className='login' onSubmit={login}>
					<h1>Log in to your account</h1>
					<h2>
						Log in now to get started building your portolfio and launch your
						career
					</h2>
					<TextField
						sx={{ mt: '0rem', ml: '10%', mr: '10%' }}
						id='email'
						label='email'
					/>
					<TextField
						id='password'
						sx={{ mt: '1rem', ml: '10%', mr: '10%' }}
						label='password'
						type='password'
						variant='outlined'
					/>
					<Link className='forgot-password' to='/' onClick={handleLoginView}>
						Forgot password?
					</Link>
					<Button
						sx={{ ml: '10%', mr: '10%', mt: '1rem' }}
						variant='contained'
						size='large'
						type='submit'
						onClick={null}
					>
						LOG IN
					</Button>
					<p className='signup'>
						Not registered yet? <Link to='/sign-up'>Create an account</Link>
					</p>
					<div className='login-footer'>
						<p>© 2020 Junior. All rights reserved</p>
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
				</form>
			</div>
		</div>
	);
}
