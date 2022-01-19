import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import './styles/NavBar.scss';
import UserMenu from '../components/UserMenu';
import axios from 'axios';

export default function NavBar(props) {
	const {
		loginView,
		setLoginView,
		handleLoginView,
		currentUser,
		setCurrentUser,
	} = props;

	const location = useLocation();

	const logout = () => {
		axios
			.post('api/auth/logout')
			.then(res => setCurrentUser(res.data))
			.catch(err => console.log(err));
	};

	const navClassCheck = () => {
		return location.pathname === '/' ? 'nav-home' : 'nav-bar';
	};

	return (
		<div className={navClassCheck()}>
			<Link id='logo' to='/'>
				Junior.
			</Link>

			<Link id='find-work' to='/jobs'>
				Find Work
			</Link>
			<Link to='/profile'>How it works</Link>
			<Link to='/profile'>Company</Link>
			<Link id='hire-talent' to='/profile'>
				Hire Talent
			</Link>
			{!currentUser.id && (
				<Button id='login' variant='outlined' onClick={e => handleLoginView(e)}>
					Login
				</Button>
			)}
			{!currentUser.id && (
				<Button id='signup' variant='contained'>
					Sign Up
				</Button>
			)}
			{currentUser.id && <UserMenu currentUser={currentUser} logout={logout} />}
		</div>
	);
}
