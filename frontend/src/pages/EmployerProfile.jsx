import {useEffect, useState} from 'react';
import './styles/Profile.scss';
import {Grid} from '@mui/material';
import PortfolioCard from '../components/PortfolioCard';
import JobPostingCard from '../components/JobPostingCard';
import GigPostingCard from '../components/GigPostingCard';
import axios from 'axios';

export default function Profile(props) {
  const [profile, setProfile] = useState({
    employer: {},
    jobs: [],
    gigs: []
  });
  
  // FOR TESTING
  const id = 1;
  //

  const {company_name, email, photo_url, bio} = profile.employer;

  useEffect(() => {
    const employerUrl = '/api/employers/' + id;
    const employerJobsUrl = '/api/employers/' + id + '/job_postings';
    const employerGigsUrl = '/api/employers/' + id + '/gig_postings';
    Promise.all([
      axios.get(employerUrl),
      axios.get(employerJobsUrl),
      axios.get(employerGigsUrl),
    ]).then((all) => {
      const [employerData, jobPostingsData, gigPostingsData] = all;
      setProfile(prev => ({...prev,
        employer: employerData.data,
        jobs: jobPostingsData.data,
        gigs: gigPostingsData.data
      }));
    });
  }, []);

  const jobsArray = profile.jobs;
  const gigsArray = profile.gigs;

	const parsedJobs = jobsArray.map(job => {
		return (
      <Grid item xs={10} md={4}>
        <JobPostingCard key={job.id}
          {...job}
        />
      </Grid>
		)
	});
  const parsedGigs = gigsArray.map(gig => {
		return (
      <Grid item xs={10} md={4}>
        <GigPostingCard key={gig.id}
          {...gig}
        />
      </Grid>
		)
	});

  return (
    <div className="profile-content">
      <section className="profile-bio">
        <img id="profile-pic" src={photo_url} alt="Avatar"></img>
        <section>
          <h1>Company Name: {company_name}</h1>
          <h1>Bio: {bio ? bio : 'N/A'}</h1>
        </section>
        <section>
          <h1>Email: {email}</h1>
          <h1>Job Postings: {profile.jobs.length ? profile.jobs.length : '0'}</h1>
          <h1>Gig Postings: {profile.gigs.length ? profile.gigs.length : '0'}</h1>
        </section>
      </section>
      {parsedJobs.length != 0 && (
        <section className='cards'>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h1>Job postings:</h1>
            </Grid>
            {parsedJobs}
          </Grid>
        </section>
      )}
      {parsedGigs.length != 0 && (
        <section className='cards'>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h1>Gig postings:</h1>
            </Grid>
            {parsedGigs}
          </Grid>
        </section>
      )}
    </div>
  );
}
