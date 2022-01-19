import {useEffect, useState} from 'react';
import './styles/Profile.scss';
import {Grid, Button, Modal, Box, Paper, Card, CardActionArea, CardActions} from '@mui/material';
import JobPostingCard from '../components/JobPostingCard';
import JobPostingModal from '../components/JobPostingModal';
import GigPostingCard from '../components/GigPostingCard';
import GigPostingModal from '../components/GigPostingModal';
import axios from 'axios';

export default function Profile(props) {
  const [profile, setProfile] = useState({
    employer: {},
    jobs: [],
    gigs: []
  });
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState();

	const handleView = () => {
		openModal === true ? setOpenModal(false) : setOpenModal(true);
	};

  // FOR TESTING
  const id = 1;
  //

	const style = {
		width: 1 / 2,
		height: 1 / 2,
		display: 'flex',
		flexDirection: 'column',
		margin: '10% 0 0 25%',
		background: '#223d55',
		color: 'black',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: '2rem',
	};

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
    const data = (<JobPostingModal key={'Job-modal-' + job.id} {...job} />);
    const applicationLink = `job/${job.id}/applications`;
		return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={'Job-grid-item-' + job.id}>
        <Grid container direction='column' key={'Job-grid-container-' + job.id}>
          <Paper key={'Job-paper-' + job.id}>
            <Card key={'Job-card-' + job.id}>
              <CardActionArea key={'Job-card-action' + job.id}
                onClick={() => {
                setModalData(data);
                handleView();
              }}>
                <JobPostingCard key={'Job-card-' + job.id}
                  type='job'
                  {...job}
                />
              </CardActionArea>
              <CardActions key={'Job-card-actions-' + job.id}>
                <Button key={'Job-button-' + job.id}
                  onClick={() => window.open(applicationLink, "_self")}>
                  View Applications
                </Button>
              </CardActions>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    )
	});
  const parsedGigs = gigsArray.map(gig => {
    const data = (<GigPostingModal key={'Gig-modal-' + gig.id} {...gig} />);
    const applicationLink = `gig/${gig.id}/applications`;
		return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={'Gig-grid-item-' + gig.id} >
        <Grid container direction='column' key={'Gig-grid-container-' + gig.id}>
          <Paper key={'Gig-paper-' + gig.id}>
            <Card key={'Gig-card-' + gig.id}>
              <CardActionArea key={'Gig-card-action' + gig.id}
                onClick={() => {
                setModalData(data);
                handleView();
              }}>
                <GigPostingCard key={'Gig-card-post-' + gig.id}
                  type='gig'
                  {...gig}
                />
              </CardActionArea>
              <CardActions key={'Gig-card-actions-' + gig.id}>
                <Button key={'Gig-button-' + gig.id}
                  className='card-footer'
                  onClick={() => window.open(applicationLink, "_self")}>
                  View Applications
                </Button>
              </CardActions>
            </Card>
          </Paper>
        </Grid>
      </Grid>
		)
	});

  return (
    <div className="profile-content">
      <Grid container className="profile-bio" columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item className="profile-pic">
          <img id="profile-pic" src={photo_url} alt="Avatar"></img>
        </Grid>
        <Grid item className="profile-name">
          <h4>Company Name: {company_name}</h4>
          <h4>Bio: {bio ? bio : 'N/A'}</h4>
        </Grid>
        <Grid item className="profile-links">
          <h4>Email: {email}</h4>
          <h4>Job Postings: {profile.jobs.length}</h4>
          <h4>Gig Postings: {profile.gigs.length}</h4>
        </Grid>
      </Grid>
      {(parsedJobs.length === 0 && parsedGigs.length === 0) && (<h1>No postings.</h1>)}
      {parsedJobs.length !== 0 && (
        <section className='profile-cards'>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <h1>{company_name ? company_name + "'s " : null}Job Postings:</h1>
            </Grid>
            {parsedJobs}
          </Grid>
        </section>
      )}
      {parsedGigs.length !== 0 && (
        <section className='profile-cards'>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
            <h1>{company_name ? company_name + "'s " : null}Gig Postings:</h1>
            </Grid>
            {parsedGigs}
          </Grid>
        </section>
      )}
      <Modal
        open={openModal}
        onClose={handleView}
        className='portfolio-modal'
      >
        <Box sx={style}>
          {modalData}
        </Box>
      </Modal>
    </div>
  );
}
