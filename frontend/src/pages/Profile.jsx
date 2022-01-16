import {useEffect} from 'react';
import './styles/Profile.scss';
import {Grid, Paper} from '@mui/material';
import PortfolioCard from '../components/PortfolioCard';
import axios from 'axios';

export default function Profile(props) {
  // const {first_name, last_name, email, github_url, linkedIn_url, bio} = props;
  
  // FOR TESTING
  const dev = {"id":1,"first_name":"Marija","last_name":"Yamada","email":"1@junior.com","password":"123","bio":"My bio","photo_url":"https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1-300x300.jpg","github_url":null,"linkedIn_url":null,"resume_url":null,"location":null};
  const projects = [{"junior_dev_id":1,"first_name":"Marija","last_name":"Yamada","email":"1@junior.com","project_id":1,"title":"Tweeter","description":"Tweeter is a simple, single-page Twitter clone with the functionality of posting tweets and viewing them on the main tweeter page.","thumbnail_photo_url":"https://github.com/karolinaCodes/Tweeter/blob/master/docs/mainpage.jpeg","github_link":"https://github.com/karolinaCodes/Tweeter","live_link":"https://github.com/karolinaCodes/Tweeter"},{"junior_dev_id":1,"first_name":"Marija","last_name":"Yamada","email":"1@junior.com","project_id":2,"title":"Interview Scheduler","description":"A single-page React application that allows students of the LightHouse Labs Web Development Bootcamp to book and manage an interview with a mentor.","thumbnail_photo_url":"https://user-images.githubusercontent.com/82968631/146260400-31c25c0d-8c61-4520-a2ef-7c4af2615245.gif","github_link":"https://github.com/karolinaCodes/Interview-Scheduler","live_link":"https://github.com/karolinaCodes/Interview-Scheduler"},{"junior_dev_id":1,"first_name":"Marija","last_name":"Yamada","email":"1@junior.com","project_id":3,"title":"Tinyapp","description":"A simple URL shortener app that takes a regular URL and transforms it into an encoded version (similar to bit.ly).","thumbnail_photo_url":"https://github.com/karolinaCodes/Tinyapp/blob/master/docs/urls_register.jpeg","github_link":"https://github.com/karolinaCodes/Tinyapp","live_link":"https://github.com/karolinaCodes/Tinyapp"}];

  const {first_name, last_name, email, photo_url, github_url, linkedIn_url, bio} = dev;
  //

  useEffect(() => {
    // DEV BY IS
    axios
      .get('/api/devs/2')
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));

    // EMPLOYER BY ID
    axios
      .get('/api/employers/1')
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));

    /// ----> tomorrow morning
    // JOB APPLICATIONS BY ID
    axios
      .get('/api/employers/1')
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
    // CREATE NEW JOB APPLICATION
    axios
      .get('/api/employers/1')
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  });

  const projectsArray = projects;
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
          <h1>Bio: {bio}</h1>
        </section>
        <section>
          <h1>Email: {email}</h1>
          <h1>GitHub: {github_url ? {github_url} : 'N/A'}</h1>
          <h1>LinkedIn: {linkedIn_url ? {linkedIn_url} : 'N/A'}</h1>
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
