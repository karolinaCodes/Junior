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
        <section className="search-content">
          <section className="title-text">
            <h1 className="build">Build Your Portfolio.</h1>
            <h1 className="get-paid">Get Paid. Find Work.</h1>
          </section>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            <br></br>
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <form className="search">
            <TextField id="search-bar" label="Find Work" variant="outlined" />
            <Button variant="contained" size="large" href="/jobs">
              SEARCH
            </Button>
          </form>
        </section>
        <div id="brand-logos">
          <img src="images/homepage-brands.png" alt="trusted brands" />
        </div>
      </div>
    );
  };

  return (
    <div className="landing-wrapper">
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
      {/* <div className='footer'>
				<section>TinyApp</section>
				<section>Tweeter</section>
				<section>Jungle</section>
				<section>Vampr</section>
			</div> */}
    </div>
  );
}
