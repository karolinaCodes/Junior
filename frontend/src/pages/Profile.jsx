import {useEffect, useState} from 'react';
import './styles/Profile.scss';
import {Grid} from '@mui/material';
import PortfolioCard from '../components/PortfolioCard';
import axios from 'axios';

export default function Profile(props) {
  const [profile, setProfile] = useState({
    dev: {},
    projects: [],
  });

  // FOR TESTING
  const id = 1;
  //

  // FOR TESTING ENDPOINTS
  // useEffect(() => {
  //	-retrieve a job application by application id
  //   axios
  //     .get('/api/job_applications/1')
  //     .then(res => {
  //       console.log(res.data);
  //     })
  //     .catch(err => console.log(err));

  //	-create a new job application
  // axios
  //   .get('/api/job_applications/new')
  //   .then(res => {
  //     console.log(res.data);
  //   })
  //   .catch(err => console.log(err));
  // }, []);

  const {
    first_name,
    last_name,
    email,
    photo_url,
    github_url,
    linkedIn_url,
    bio,
  } = profile.dev;

  useEffect(() => {
    const devUrl = '/api/devs/' + id;
    const projectsByDevUrl = '/api/devs/' + id + '/projects';
    Promise.all([axios.get(devUrl), axios.get(projectsByDevUrl)]).then(all => {
      const [devData, projectsByDevData] = all;
      setProfile(prev => ({
        ...prev,
        dev: devData.data,
        projects: projectsByDevData.data,
      }));
    });
  }, []);

  const projectsArray = profile.projects;
  const parsedProjects = projectsArray.map(project => {
    return (
      <Grid item xs={10} md={4}>
        <PortfolioCard key={project.id} {...project} />
      </Grid>
    );
  });

  return (
    <div className="profile-content">
      <section className="profile-bio">
        <img id="profile-pic" src={photo_url} alt="Avatar"></img>
        <section>
          <h1>Name: {`${first_name} ${last_name}`}</h1>
          <h1>Bio: {bio ? bio : 'N/A'}</h1>
        </section>
        <section>
          <h1>Email: {email}</h1>
          <h1>GitHub: {github_url ? github_url : 'N/A'}</h1>
          <h1>LinkedIn: {linkedIn_url ? linkedIn_url : 'N/A'}</h1>
        </section>
      </section>
      <section className="cards">
        <Grid container spacing={3}>
          {parsedProjects}
        </Grid>
      </section>
    </div>
  );
}
