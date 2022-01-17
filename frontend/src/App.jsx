import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Routes, Route } from 'react-router-dom';

//import components
import JobSearch from './pages/JobSearch.jsx';
import LandingPage from './pages/LandingPage.jsx';
import NewJob from './pages/NewJob.jsx';
import NewGigPost from './components/NewGigPost';
import Profile from './pages/Profile.jsx';
import EmployerProfile from './pages/EmployerProfile.jsx';
import NavBar from './pages/NavBar.jsx';
import PortfolioModal from './components/PortfolioModal';
import ApplyModal from './components/ApplyModal';
import NewProjectPost from './components/NewProjectPost.jsx';

//import css
import './App.scss';

function App() {
	const [loginView, setLoginView] = useState(false);
	const [currentUser, setCurrentUser] = useState({
		id: null,
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		bio: '',
		photo_url: '',
		github_url: '',
		linkedIn_url: '',
		resume_url: '',
		location: '',
		company_name: '',
	});

	const handleLoginView = () => {
		loginView ? setLoginView(false) : setLoginView(true);
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
				<Route path='/profile' element={<Profile />} />
				<Route path='/employerprofile' element={<EmployerProfile />} />
				<Route path='/jobs' element={<JobSearch />} />
				<Route
					path='/newproject'
					element={<NewProjectPost currentUser={currentUser} />}
				/>
				<Route path='/newjob' element={<NewJob />} />
				<Route
					path='/newgig'
					element={<NewGigPost currentUser={currentUser} />}
				/>
				<Route path='/portfoliomodal' element={<PortfolioModal />} />
				<Route path='/applymodal' element={<ApplyModal />} />
			</Routes>
		</div>
	);
}

export default App;
