import { useState, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

//import components
import JobSearch from './pages/JobSearch/JobSearch.jsx';
import LandingPage from './pages/LandingPage.jsx';
import NewJobPost from './components/NewJobPost.jsx';
import NewGigPost from './components/NewGigPost';
import Profile from './pages/Profile.jsx';
import EmployerProfile from './pages/EmployerProfile.jsx';
import NavBar from './components/NavBar.jsx';
import GigView from './pages/JobSearch/GigView';
import JobView from './pages/JobSearch/JobView.jsx';
import PortfolioModal from './components/PortfolioModal';
import ApplyModal from './components/JobSearch/ApplyModal';
import NewProjectPost from './components/NewProjectPost.jsx';
import ApplicationsTest from './pages/TestApplications.jsx';
import Applications from './components/Applications.jsx';
import { UserContext } from './Providers/userProvider.jsx';
import Footer from './components/Footer';
import SavedJobsGigs from './pages/SavedJobsGigs';

//import css
import './App.scss';
import UserAcceptedGigs from './components/UserAcceptedGigs.jsx';

function App() {
	const { currentUser } = useContext(UserContext);
	const [loginView, setLoginView] = useState(false);
	let navigate = useNavigate();

	const handleLoginView = e => {
		if (currentUser.id) {
			setLoginView(false);
		} else {
			navigate('/');
			setLoginView(true);
		}
	};

	return (
		<div className='App'>
			<NavBar handleLoginView={handleLoginView} />
			<Routes>
				<Route
					path='/'
					element={
						<LandingPage
							loginView={loginView}
							handleLoginView={handleLoginView}
						/>
					}
				/>
				<Route path='/dev/:dev_id' element={<Profile />} />
				<Route path='/employer/:employer_id' element={<EmployerProfile />} />
				<Route path='/jobs' element={<JobSearch />} />
				<Route path='/newproject' element={<NewProjectPost />} />
				<Route path='/newjob' element={<NewJobPost />} />
				<Route path='/newgig' element={<NewGigPost />} />
				<Route path='/portfoliomodal' element={<PortfolioModal />} />
				<Route path='/applymodal' element={<ApplyModal />} />
				<Route path='/gig/:gig_id' element={<GigView />} />
				<Route path='/job/:job_id' element={<JobView />} />
				<Route
					path='/employer/:posttype/:postid/applications'
					element={<Applications />}
				/>
				<Route path='/testapps' element={<ApplicationsTest />} />
				<Route path='/saved' element={<SavedJobsGigs />} />
				<Route path='/acceptedgigs' element={<UserAcceptedGigs />} />
			</Routes>
			{window.location.pathname !== '/' ? <Footer /> : null}
		</div>
	);
}

export default App;
