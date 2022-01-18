import { Link } from 'react-router-dom';
import './styles/NavBar.scss';
import Button from '@mui/material/Button';

const defaultUser = {
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

export default function NavBar(props) {
	const {
		loginView,
		setLoginView,
		handleLoginView,
		currentUser,
		setCurrentUser,
	} = props;

	// const navLogin = e => {
	// 	if (!loginView) {
	// 		setLoginView(true);
	// 		return;
	// 	}

	// 	null;
	// };

	const logout = () => {
		setCurrentUser(defaultUser);
	};

	return (
		<div className='nav-bar'>
			<div className='logo'>
				<Link id='logo' to='/'>
					Junior.
				</Link>
			</div>
			<div className='nav-links'>
				<Button variant='contained' onClick={logout}>
					Log Out
				</Button>
				<Button variant='contained' onClick={e => console.log(currentUser)}>
					LOG CURRENT USER
				</Button>
				<Link to='/jobs'>Job Search</Link>
				<Link to='/profile'>Profile</Link>
			</div>
			<div className='nav-button'>
				<Button
					component={Link}
					to='/'
					variant='contained'
					onClick={handleLoginView}
				>
					Login
				</Button>
				<Button variant='contained'>Sign Up</Button>
			</div>
		</div>
	);
}
