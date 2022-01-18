import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, Routes, Route} from 'react-router-dom';

//import components
import JobSearch from './pages/JobSearch.jsx';
import LandingPage from './pages/LandingPage.jsx';
import NewJob from './pages/NewJob.jsx';
import NewGigPost from './components/NewGigPost';
import Profile from './pages/Profile.jsx';
import EmployerProfile from './pages/EmployerProfile.jsx';
import NavBar from './pages/NavBar.jsx';
import GigView from './pages/GigView.jsx';
import JobView from './pages/JobView.jsx';
import PortfolioModal from './components/PortfolioModal';
import ApplyModal from './components/ApplyModal';
import NewProjectPost from './components/NewProjectPost.jsx';
import Applications from './pages/Applications.jsx';

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

  useEffect(() => {
    axios
      .post('/api/auth/check')
      .then(res => {
        setCurrentUser(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleLoginView = () => {
    loginView ? setLoginView(false) : setLoginView(true);
  };

  return (
    <div className="App">
      <NavBar
        handleLoginView={handleLoginView}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <LandingPage
              loginView={loginView}
              handleLoginView={handleLoginView}
              setCurrentUser={setCurrentUser}
              currentUser={currentUser}
            />
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/employerprofile" element={<EmployerProfile />} />
        <Route path="/jobs" element={<JobSearch />} />
        <Route
          path="/newproject"
          element={<NewProjectPost currentUser={currentUser} />}
        />
        <Route path="/newjob" element={<NewJob />} />
        <Route
          path="/newgig"
          element={<NewGigPost currentUser={currentUser} />}
        />
        {/* <Route path="/newjob" element={<NewGig />} /> */}
        <Route path="/portfoliomodal" element={<PortfolioModal />} />
        <Route path="/applymodal" element={<ApplyModal />} />
        <Route path="/gig/:gig_id" element={<GigView />} />
        <Route path="/gig/:posting_id/applications" element={<Applications type='gig' />} />
        <Route path="/job/:job_id" element={<JobView />} />
        <Route path="/job/:posting_id/applications" element={<Applications type='job' />} />
      </Routes>
    </div>
  );
}

export default App;
