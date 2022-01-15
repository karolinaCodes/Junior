import './styles/Profile.scss';

export default function Profile(props) {
	const { name, email } = props;

	return (
		<div className='profile-content'>
			<h1>Name: {name}</h1>
			<h1>Email: {email}</h1>
		</div>
	);
}
