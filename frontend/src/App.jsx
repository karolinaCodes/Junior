import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Routes, Route } from 'react-router-dom';

//import components
import Apply from './pages/Apply.jsx';
import JobSearch from './pages/JobSearch.jsx';
import LandingPage from './pages/LandingPage.jsx';
import LoginForm from './components/LoginForm.jsx';
import NewGig from './pages/NewGig.jsx';
import NewJob from './pages/NewJob.jsx';
import NewProject from './pages/NewProject.jsx';
import Profile from './pages/Profile.jsx';
import NavBar from './pages/NavBar.jsx';
import PortfolioModal from './components/PortfolioModal';
import ApplyModal from './components/ApplyModal';

//import css
import './App.scss';

function App() {
	const [login, setLogin] = useState(false);

	const handleLoginView = () => {
		login ? setLogin(false) : setLogin(true);
	};

	return (
		<div className='App'>
			<NavBar handleLoginView={handleLoginView} />
			<Routes>
				<Route
					exact
					path='/'
					element={
						<LandingPage login={login} handleLoginView={handleLoginView} />
					}
				/>
				<Route path='/profile' element={<Profile />} />
				<Route path='/jobs' element={<JobSearch />} />
				<Route path='/newproject' element={<NewProject />} />
				<Route path='/newgig' element={<NewGig />} />
				<Route path='/newjob' element={<NewJob />} />
				<Route path='/apply' element={<Apply />} />
				<Route path='/portfoliomodal' element={<PortfolioModal />} />
				<Route path='/applymodal' element={<ApplyModal />} />
			</Routes>
		</div>
	);
}

export default App;
