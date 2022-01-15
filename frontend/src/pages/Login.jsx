import './styles/Login.scss';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

export default function Login(props) {
	// // FOR EXAMPLE LOGIN FUNCTIONALITY
	// const {currentUser, setCurrentUser} = useState();

	// // EXAMPLE
	// useEffect(() => {
	//   axios.get("/api/candidates").then(res => {
	//     setCandidates(res.data);
	//   });
	// }, []);

	// // EXAMPLE LOGIN FUNCTIONALITY
	const login = () => {
		axios.post('/api/login').then(res => {
			// setCurrentUser(res.data);
			res.redirect('/profile');
		});
	};

	// // TO CHECK FOR COOKIE (IF USER SIGNED IN) ON FIRST LOAD
	// useEffect(() => {
	//   axios.post("/api/authenticate").then(res => {
	//     setCurrentUser(res.data);
	//   });
	// }, []);

	return (
		<div className='login-content'>
			<form className='login'>
				<TextField id='email' label='email' variant='outlined' />
				<TextField id='password' label='password' variant='outlined' />
				<Button variant='contained' size='large' onSubmit={login}>
					LOG IN
				</Button>
			</form>
		</div>
	);
}
