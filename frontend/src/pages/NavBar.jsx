import { Link } from 'react-router-dom';
import './styles/NavBar.scss';
import Button from '@mui/material/Button';

export default function NavBar(props) {
	const { handleLoginView } = props;

	return (
		<div className='nav-bar'>
			<div className='logo'>
				<Link id='logo' to='/'>
					Junior.
				</Link>
			</div>
			<div className='nav-links'>
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
