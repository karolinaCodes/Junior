import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';

//import components
import JobSearch from './pages/JobSearch.jsx';
import LandingPage from './pages/LandingPage.jsx';
import NewJobPost from './components/NewJobPost.jsx';
import NewGigPost from './components/NewGigPost';
import Profile from './pages/Profile.jsx';
import EmployerProfile from './pages/EmployerProfile.jsx';
import NavBar from './components/NavBar.jsx';
import GigView from './pages/GigView.jsx';
import JobView from './pages/JobView.jsx';
import PortfolioModal from './components/PortfolioModal';
import ApplyModal from './components/ApplyModal';
import NewProjectPost from './components/NewProjectPost.jsx';
import Applications from './pages/Applications.jsx';
import UserApplications from './pages/UserApplications.jsx';
import ApplicationsTest from './pages/TestApplications.jsx';

//import css
import './App.scss';

function App() {
	const [loginView, setLoginView] = useState(false);
	const [currentUser, setCurrentUser] = useState({});
	let navigate = useNavigate();

	useEffect(() => {
		axios
			.post('/api/auth/check')
			.then(res => {
				console.log(res.data, 'successfully retrieved cookie');
				setCurrentUser(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	const checkUser = () => {
		if (currentUser.id) {
			return true;
		} else {
			return false;
		}
	};

	const handleLoginView = e => {
		if (checkUser()) {
			setLoginView(false);
		} else {
			navigate('/');
			setLoginView(true);
		}
	};

	return (
		<div className='App'>
			<NavBar
				handleLoginView={handleLoginView}
				currentUser={currentUser}
				setCurrentUser={setCurrentUser}
			/>
			<Routes>
				<Route
					exact
					path='/'
					element={
						<LandingPage
							loginView={loginView}
							handleLoginView={handleLoginView}
							setCurrentUser={setCurrentUser}
							currentUser={currentUser}
						/>
					}
				/>
				<Route
					path='/profile'
					element={<Profile currentUser={currentUser} />}
				/>
				<Route path='/employerprofile' element={<EmployerProfile />} />
				<Route path='/jobs' element={<JobSearch currentUser={currentUser} />} />
				<Route
					path='/newproject'
					element={<NewProjectPost currentUser={currentUser} />}
				/>
				<Route
					path='/newjob'
					element={<NewJobPost currentUser={currentUser} />}
				/>
				<Route
					path='/newgig'
					element={<NewGigPost currentUser={currentUser} />}
				/>
				{/* <Route path="/newjob" element={<NewGig />} /> */}
				<Route path='/portfoliomodal' element={<PortfolioModal />} />
				<Route path='/applymodal' element={<ApplyModal />} />
				<Route
					path='/gig/:gig_id'
					element={<GigView currentUser={currentUser} />}
				/>
				<Route
					path='/job/:job_id'
					element={<JobView currentUser={currentUser} />}
				/>
				<Route
					path='/employerprofile/:posttype/:postid/applications'
					element={<Applications currentUser={currentUser} />}
				/>
				<Route
					path='/profile/applications'
					element={<UserApplications currentUser={currentUser} />}
				/>
				<Route
					path='/testapps'
					element={<ApplicationsTest currentUser={currentUser} />}
				/>
			</Routes>
		</div>
	);
}

export default App;
