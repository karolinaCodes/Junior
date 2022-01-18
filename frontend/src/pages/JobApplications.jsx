import './styles/LandingPage.scss';
import './styles/JobView.scss';
import {Link} from 'react-router-dom';
import {TextField, Button, Modal, Box, Grid, Paper} from '@mui/material';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Applications from '../components/Applications';

import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import axios from 'axios';

export default function LandingPage(props) {
  // const [open, setOpen] = useState(false);
  // const {job_id} = useParams();
  
  const [profile, setProfile] = useState({
    employer: {},
  });
  const [posting, setPosting] = useState({
    job: {},
    gig: {},
    applications: []
  });
  const [application, setApplication] = useState({
    id: 0,
    dev: {}
  });
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState();

  const {company_name, email, photo_url, bio} = profile.employer;
  // const employer_id = profile.employer.id;
  const {job_title, description, city, salary_min, salary_max, job_type, is_remote, date_posted, is_open} = posting.job;
  // const job_id = posting.job.id;
  // const {} = application.id;
  // const {first_name, last_name, email, photo_url, github_url, linkedIn_url, bio} = application.dev;

  // const {company_name, email, photo_url, bio} = profile.applications;

  // TESTING
  const dev_id = 1;
  const employer_id = 1;
  const job_id = 1;
  // TESTING

  useEffect(() => {
    const employerUrl = '/api/employers/' + employer_id;
    const jobUrl = '/api/job_postings/' + job_id;
    const applicationsUrl = '/api/job_postings/' + job_id + '/applications';
    const devUrl = '/api/devs/' + dev_id;
    Promise.all([
      axios.get(employerUrl),
      axios.get(jobUrl),
      axios.get(applicationsUrl),
      axios.get(devUrl),
    ]).then((all) => {
      const [employerData, jobData, applicationsData, devData] = all;
      setProfile(prev => ({...prev, employer: employerData.data}));
      setPosting(prev => ({...prev,
        job: jobData.data,
        applications: applicationsData.data
      }));
      setApplication(prev => ({...prev,
        dev: devData.data
      }));
    });
  }, []);

  const handleView = () => {
    openModal === true ? setOpenModal(false) : setOpenModal(true);
  };

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

  const applicationsArray = posting.applications;
	const parsedApplications = applicationsArray.map(application => {
    const data = (<Applications key={'Application-modal-' + application.id} {...application} />);
		return (
      <Grid item xs={10} key={'Application-grid-' + application.id}>
        <Paper
          onClick={() => {
          setModalData(data);
          handleView();
        }} key={'Application-paper-' + application.id}>
          <Applications key={'Application-card-' + application.id}
            {...application}
          />
        </Paper>
      </Grid>
    );
  });

  return (
    <div className="job-content">
      <h1>{posting.job.job_title}</h1>
      <div>
        <WorkIcon />
        <span>{posting.job.is_remote ? 'Remote' : posting.job.city}</span>
        <LocationOnIcon />
        <span>{posting.job.job_type}</span>
        <LocalOfferIcon />
        <span>{posting.job.salary_min}</span>
      </div>
      <span>
        Posted{' '}
        {new Date(posting.job.date_posted).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </span>
      <img src={posting.job.photo_url} />
      <h2>Description</h2>
      <div className="job-description">
        <p>{posting.job.description}</p>
        <img src={posting.job.employer_photo_url} />
      </div>
      <div className="application-list">
        <Grid container direction='column'>
          <h1>Applications</h1>
          Total applications: {posting.applications.length}
          {parsedApplications}
        </Grid>
      </div>
      <Modal
        open={openModal}
        onClose={handleView}
      >
        <Box sx={style}>
        </Box>
      </Modal>
    </div>
  );
}
