import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import {useLocation} from 'react-router-dom';
import './styles/NavBar.scss';
import UserMenu from '../components/UserMenu';

const defaultUser = {
  id: null,
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  bio: String,
  photo_url: String,
  github_url: String,
  linkedIn_url: String,
  resume_url: String,
  location: String,
  company_name: String,
};

export default function NavBar(props) {
  const {
    loginView,
    setLoginView,
    handleLoginView,
    currentUser,
    setCurrentUser,
  } = props;

  const location = useLocation();

  const logout = () => {
    setCurrentUser(defaultUser);
  };

  const navClassCheck = () => {
    if (location.pathname === '/') {
      return 'nav-home';
    } else {
      return 'nav-bar';
    }
  };

  return (
    <div className={navClassCheck()}>
      <div className="logo">
        <Link id="logo" to="/">
          Junior.
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/jobs">Find Work</Link>
        <Link to="/profile">How it works</Link>
        <Link to="/profile">Company</Link>
        <Link to="/profile">Hire Talent</Link>
      </div>
      <div className="nav-button">
        <Button
          id="login"
          component={Link}
          to="/"
          variant="outlined"
          onClick={handleLoginView}
        >
          Login
        </Button>
        <Button id="signup" variant="contained">
          Sign Up
        </Button>
        <UserMenu currentUser={currentUser} />
      </div>
    </div>
  );
}
