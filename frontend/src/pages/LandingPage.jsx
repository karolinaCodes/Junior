import './styles/LandingPage.scss';
import {Link} from 'react-router-dom';
import {TextField, Button} from '@mui/material';
import {useEffect, useState} from 'react';

import LoginForm from '../components/LoginForm';

export default function LandingPage(props) {
  const {loginView, handleLoginView, currentUser, setCurrentUser} = props;

  const searchView = () => {
    return (
      <div className="search-wrapper">
        <section className="title-text">
          <h1 className="build">Build Your Portfolio.</h1>
          <h1 className="get-paid">Get Paid. Find Work.</h1>
        </section>
        <form className="search">
          <TextField id="search-bar" label="Find Work" variant="outlined" />
          <Button variant="contained" size="large" href="/jobs">
            SEARCH
          </Button>
        </form>
      </div>
    );
  };

  return (
    <div className="landing-wrapper">
      <div id="landing-image">
        <img src="images/landing-page-image.png"></img>
      </div>
      <div className="landing-content">
        {loginView && (
          <LoginForm
            handleLoginView={handleLoginView}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        )}
        {!loginView && searchView()}
      </div>
    </div>
  );
}
