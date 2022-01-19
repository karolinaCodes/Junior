import {Link} from 'react-router-dom';
import './styles/NavBar.scss';
import Button from '@mui/material/Button';
import UserMenu from '../components/UserMenu.jsx';

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

  // const navLogin = e => {
  // 	if (!loginView) {
  // 		setLoginView(true);
  // 		return;
  // 	}

  // 	null;
  // };

  const logout = () => {
    setCurrentUser(defaultUser);
  };

  return (
    <div className="nav-bar">
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
        <UserMenu />
      </div>
    </div>
  );
}
