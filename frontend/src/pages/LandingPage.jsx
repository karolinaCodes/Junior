import './styles/LandingPage.scss';
import {Link} from 'react-router-dom';
import {TextField, Button} from '@mui/material';
import {useEffect, useState} from 'react';

import LoginForm from '../components/LoginForm';

export default function LandingPage(props) {
  const {loginView, handleLoginView, currentUser, setCurrentUser} = props;

  const searchView = () => {
    return (
      <div>
        <div id="white-box">
          <h1 className="build">Build Your Portfolio.</h1>
          <h1 className="get-paid">Get Paid. Find Work.</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            <br></br>
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <form className="search">
            <TextField id="search-bar" label="Find Work" variant="outlined" />
            <Button
              sx={{ml: '2rem'}}
              variant="contained"
              size="large"
              href="/jobs"
            >
              SEARCH
            </Button>
          </form>
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

// testing
