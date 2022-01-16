import {useEffect} from 'react';
import './styles/Profile.scss';
import {Grid, Paper} from '@mui/material';
import PortfolioCard from '../components/PortfolioCard';
import axios from 'axios';

export default function Profile(props) {
  const {name, email, github, linkedin, bio} = props;

  useEffect(() => {
    axios
      .get('/api/devs/2')
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  });

  useEffect(() => {
    axios
      .get('/api/employers/1')
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  });

  return (
    <div className="profile-content">
      <section className="profile-bio">
        <img id="profile-pic" src="nil"></img>
        <section>
          <h1>Name: {name}</h1>
          <h1>Bio: {bio}</h1>
        </section>
        <section>
          <h1>Email: {email}</h1>
          <h1>GitHub: {github}</h1>
          <h1>LinkedIn: {linkedin}</h1>
        </section>
      </section>
      <PortfolioCard />
    </div>
  );
}
