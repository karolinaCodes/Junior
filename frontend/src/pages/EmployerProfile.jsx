import {useEffect, useState} from 'react';
import './styles/Profile.scss';
import {Grid, Button, Modal, Box, Paper} from '@mui/material';
import {Link} from 'react-router-dom';
import JobPostingCard from '../components/JobPostingCard';
import JobPostingModal from '../components/JobPostingModal';
import GigPostingCard from '../components/GigPostingCard';
import GigPostingModal from '../components/GigPostingModal';
import Applications from './Applications';
import axios from 'axios';

export default function Profile(props) {
  // const {id} = useParams();
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
    const applicationLink = `employerprofile/job/${job.id}/applications`;
		return (
      <Grid item xs={10} sm={6} md={4} key={'Job-grid-item-' + job.id}>
        <Grid container direction='column' key={'Job-grid-container-' + job.id}>
          <Paper sx={{height: '300px', overflow: 'hidden'}}
            onClick={() => {
            setModalData(data);
            handleView();
          }} key={'Job-paper-' + job.id}>
            <JobPostingCard key={'Job-card-' + job.id}
              {...job}
            />
          </Paper>
            <Box>
              <Button onClick={() => window.open(applicationLink, "_self")}>
                View Applications
              </Button>
            </Box>
        </Grid>
      </Grid>
    )
	});
  const parsedGigs = gigsArray.map(gig => {
    const data = (<GigPostingModal key={'Gig-modal-' + gig.id} {...gig} />);
    const applicationLink = `employerprofile/gig/${gig.id}/applications`;
		return (
      <Grid item xs={10} sm={6} md={4} key={'Gig-grid-item-' + gig.id} >
        <Grid container direction='column' key={'Gig-grid-container-' + gig.id}>
          <Paper sx={{height: '300px', overflow: 'hidden'}}
            onClick={() => {
            setModalData(data);
            handleView();
          }} key={'Gig-paper-' + gig.id}>
          <GigPostingCard key={'Gig-card-' + gig.id}
            {...gig}
          />
          </Paper>
          <Box>
            <Button onClick={() => window.open(applicationLink, "_self")}>
              View Applications
            </Button>
          </Box>
        </Grid>
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
          <h1>Job Postings: {profile.jobs.length}</h1>
          <h1>Gig Postings: {profile.gigs.length}</h1>
        </section>
      </section>
      {(parsedJobs.length === 0 && parsedGigs.length === 0) && (<h1>No postings.</h1>)}
      {parsedJobs.length !== 0 && (
        <section className='cards'>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <h1>{company_name ? company_name + "'s " : null}Job Postings:</h1>
            </Grid>
            {parsedJobs}
          </Grid>
        </section>
      )}
      {parsedGigs.length !== 0 && (
        <section className='cards'>
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
      >
        <Box sx={style}>
          {modalData}
        </Box>
      </Modal>
    </div>
  );
}
