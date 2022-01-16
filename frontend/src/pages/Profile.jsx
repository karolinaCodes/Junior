import {useEffect, useState} from 'react';
import './styles/Profile.scss';
import {Grid} from '@mui/material';
import PortfolioCard from '../components/PortfolioCard';
import axios from 'axios';

export default function Profile(props) {
  const [profile, setProfile] = useState({
    dev: {},
    projects: []
  });
  
  // FOR TESTING
  const id = 1;
  //

  const {first_name, last_name, email, photo_url, github_url, linkedIn_url, bio} = profile.dev;

  useEffect(() => {
    const devUrl = '/api/devs/' + id;
    const projectsByDevUrl = '/api/projects/' + id;
    Promise.all([
      axios.get(devUrl),
      axios.get(projectsByDevUrl),
    ]).then((all) => {
      const [devData, projectsByDevData] = all;
      setProfile(prev => ({...prev,
        dev: devData.data,
        projects: projectsByDevData.data
      }));
    });
  }, []);

  const projectsArray = profile.projects;
	const parsedProjects = projectsArray.map(project => {
		return (
			<PortfolioCard key={project.id}
				{...project}
			/>
		)
	});

  return (
    <div className="profile-content">
      <section className="profile-bio">
        <img id="profile-pic" src={photo_url}></img>
        <section>
          <h1>Name: {`${first_name} ${last_name}`}</h1>
          {/* <h1>Bio: {bio}</h1> */}
          <h1>Bio: {bio ? bio : 'N/A'}</h1>
        </section>
        <section>
          <h1>Email: {email}</h1>
          <h1>GitHub: {github_url ? github_url : 'N/A'}</h1>
          <h1>LinkedIn: {linkedIn_url ? linkedIn_url : 'N/A'}</h1>
        </section>
      </section>
      <section className='cards'>
        <Grid
          container
          direction='row'
          justifyContent='space-around'
          spacing={1}
          item xs={10} md={3}
        >
          <Grid item>
            {parsedProjects}
          </Grid>
        </Grid>
		  </section>
    </div>
  );
}
