import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../Providers/userProvider';
import './styles/NavBar.scss';
import UserMenu from '../components/UserMenu';
import axios from 'axios';

export default function NavBar(props) {
	const { handleLoginView } = props;
	const { currentUser, setCurrentUser } = useContext(UserContext);

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

	const logoText = '< Junior />';

	return (
		<div className={navClassCheck()}>
			<Link id='logo' to='/'>
				{/* <img
          src="/images/Screen_Shot_2022-01-24_at_3.31.14_PM__2_-removebg-preview.png"
          id="logo-img"
        /> */}
				<h1 id='logo-text'>{logoText}</h1>
			</Link>
			<div className='nav-links'>
				<Link id='find-work' to='/jobs'>
					Find Work
				</Link>
				<Link to={location.pathname}>How it works</Link>
				<Link to={location.pathname}>Company</Link>
				{currentUser.company_name && (
					<Link id='hire-talent' to={location.pathname}>
						Hire Talent
					</Link>
				)}
				<div>
					{!currentUser.id && (
						<Button
							id='login'
							variant='outlined'
							onClick={e => handleLoginView()}
						>
							Log In
						</Button>
					)}
					{!currentUser.id && (
						<Button id='signup' variant='contained'>
							Sign Up
						</Button>
					)}
					{currentUser.id && (
						<UserMenu currentUser={currentUser} logout={logout} />
					)}
				</div>
			</div>
		</div>
	);
}
