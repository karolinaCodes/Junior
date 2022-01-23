import './styles/Profile.scss';
import {useEffect, useState, useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../Providers/userProvider';
import {
  Grid,
  Button,
  Modal,
  Box,
  Paper,
  Card,
  CardActionArea,
  CardActions,
  Dialog,
} from '@mui/material';
import JobPostingCard from '../components/JobPostingCard';
import axios from 'axios';


export default function Profile(props) {
  const { currentUser } = useContext(UserContext);
  console.log('currentUser',currentUser);
  const {id} = useParams();
  console.log('useParams',id);
	const navigate = useNavigate();
  
  const [profile, setProfile] = useState({
    employer: {},
    jobs: [],
    gigs: [],
  });
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState();

  const handleView = () => {
    openModal === true ? setOpenModal(false) : setOpenModal(true);
  };

  // const { id } = currentUser;
  
  const {company_name, email, photo_url, bio} = profile.employer;
  // const {company_name, email, photo_url, bio} = '';
  
  useEffect(() => {
    const employerUrl = `/api/employers/${id}`;
    const employerJobsUrl = `/api/employers/${id}/job_postings`;
    const employerGigsUrl = `/api/employers/${id}/gig_postings`;
    if (id) {
      const employerPromise = axios.get(employerUrl);
      const jobsPromise = axios.get(employerJobsUrl);
      const gigsPromise = axios.get(employerGigsUrl);
      Promise.all([employerPromise, jobsPromise, gigsPromise])
      .then(data => {
        const employerData = data[0].data;
        const jobPostingsData = data[1].data;
        const gigPostingsData = data[2].data;
        setProfile(prev => ({
          ...prev,
          jobs: jobPostingsData,
          employer: employerData,
          gigs: gigPostingsData,
        }));
      });
    }
  }, [id]);

  const jobsArray = profile.jobs;
  const gigsArray = profile.gigs;

  const parsedJobs = Array.isArray(jobsArray) ? jobsArray.map(job => {
    const data = <JobPostingCard key={'Job-modal-' + job.id} {...job} />;

    const applicationLink = `employerprofile/job/${job.id}/applications`;
    const postingLink = `job/${job.id}`;
		return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={'Job-grid-item-' + job.id}>
        <Grid container direction='column' key={'Job-grid-container-' + job.id}>
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
                Applications
              </Button>
              <Button key={'Job-button-post-' + job.id}
                className='card-footer'
                onClick={() => window.open(postingLink, "_self")}>
                Posting
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    )})
    : [];
    
  const parsedGigs = Array.isArray(jobsArray) ? gigsArray.map(gig => {
    const data = (<JobPostingCard key={'Gig-modal-' + gig.id} {...gig} />);
    const applicationLink = `employerprofile/gig/${gig.id}/applications`;
    const postingLink = `gig/${gig.id}`;
		return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={'Gig-grid-item-' + gig.id} >
        <Grid container direction='column' key={'Gig-grid-container-' + gig.id}>
          <Card key={'Gig-card-' + gig.id}>
            <CardActionArea key={'Gig-card-action' + gig.id}
              onClick={() => {
              setModalData(data);
              handleView();
            }}>
              <JobPostingCard key={'Gig-card-post-' + gig.id}
                type='gig'
                {...gig}
              />
            </CardActionArea>
            <CardActions key={'Gig-card-actions-' + gig.id}>
              <Button key={'Gig-button-' + gig.id}
                className='card-footer'
                onClick={() => window.open(applicationLink, "_self")}>
                Applications
              </Button>
              <Button key={'Gig-button-post-' + gig.id}
                className='card-footer'
                onClick={() => window.open(postingLink, "_self")}>
                Posting
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    )})
    : [];

  return (
    <div className="profile-content">
      <Grid
        container
        className="profile-bio"
      >
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
      <Grid container direction='column'>
        <section className="posting-content">
          {parsedJobs.length === 0 && parsedGigs.length === 0 && (
            <h1>No postings.</h1>
          )}
          {parsedJobs.length !== 0 && (
            <section className='profile-cards'>
              <Grid container>
                <Grid item xs={12}>
                  <h1>{company_name ? company_name + "'s " : null}Job Postings:</h1>
                </Grid>
                {parsedJobs}
              </Grid>
            </section>
          )}
          {parsedGigs.length !== 0 && (
            <section className='profile-cards'>
              <Grid container>
                <Grid item xs={12}>
                  <h1>{company_name ? company_name + "'s " : null}Gig Postings:</h1>
                </Grid>
                {parsedGigs}
              </Grid>
            </section>
          )}
        </section>
      </Grid>
      <Dialog
        open={openModal}
        onClose={handleView}
        fullWidth={true}
        maxWidth={'md'}
      >
        <Box className="portfolio-modal">{modalData}</Box>
      </Dialog>
    </div>
  );
}
