import './styles/LandingPage.scss';
import LoginForm from '../components/LoginForm';
import SearchBar from '../components/SearchBar';
import {useContext} from 'react';
import {UserContext} from '../Providers/userProvider';
import Button from '@mui/material/Button';

export default function LandingPage(props) {
  const {loginView, handleLoginView} = props;
  const {currentUser, setCurrentUser} = useContext(UserContext);

  const searchView = () => {
    return (
      <div>
        <div id="white-box">
          <h1 className="build">Build your portfolio.</h1>
          <h1 className="get-paid">Get paid. Find work.</h1>
          <p>
            Junior helps budding developers to showcase and build their
            portfolios. Connect with employers and keep active by completing
            gigs while looking for junior developer roles.
          </p>
          {/* <div> */}
          {/* <Button>Junior Developer</Button>
            <Button variant="outline">Employer</Button> */}
          {/* </div> */}
          <SearchBar />
          <img src="images/homepage-brands.png" alt="trusted brands" />
        </div>
      </div>
    );
  };

  return (
    <div className="landing-wrapper">
      {loginView && (
        <LoginForm
          handleLoginView={handleLoginView}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )}
      {!loginView && searchView()}
    </div>
  );
}
