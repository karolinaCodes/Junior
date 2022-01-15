import { Link } from 'react-router-dom';
import './NavBar.scss';

export default function NavBar(props) {
	return (
		<div className='nav-bar'>
			<Link to='/'>Home</Link>
			<Link to='/login'>Login</Link>
			<Link to='/jobs'>Job Search</Link>
			<Link to='/profile'>Profile</Link>
		</div>
	);
}
