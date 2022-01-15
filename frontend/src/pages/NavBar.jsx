import { Link } from 'react-router-dom';
import './styles/NavBar.scss';

export default function NavBar(props) {
	return (
		<div className='nav-bar'>
			<div className='logo'>
				<Link to='/'>Junior.</Link>
			</div>
			<div className='nav-links'>
				<Link to='/login'>Login</Link>
				<Link to='/jobs'>Job Search</Link>
				<Link to='/profile'>Profile</Link>
			</div>
		</div>
	);
}
