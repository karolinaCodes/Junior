import './styles/LandingPage.scss';
import './styles/JobView.scss';
import {Modal, Box, Grid, Paper} from '@mui/material';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import ApplicationCard from '../components/Applications';

import axios from 'axios';

export default function Applications(props) {
  // Get the gig_posting id from url
  const {gig_id} = useParams();
  
  const [profile, setProfile] = useState({
    employer: {},
  });
  const [posting, setPosting] = useState({
    job: {},
    gig: {},
    applications: []
  });

  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState();

  const handleView = () => {
    openModal === true ? setOpenModal(false) : setOpenModal(true);
  };

  const {company_name, email, bio} = profile.employer;
  const {employer_photo_url, job_title, description, pay, date_posted, deadline, photo_url} = posting.gig;

  // TESTING
  const employer_id = 1;
  // TESTING

  useEffect(() => {
    const employerUrl = '/api/employers/' + employer_id;
    const gigUrl = '/api/gig_postings/' + gig_id;
    const applicationsUrl = '/api/gig_postings/' + gig_id + '/applications';
    Promise.all([
      axios.get(employerUrl),
      axios.get(gigUrl),
      axios.get(applicationsUrl),
    ]).then((all) => {
      const [employerData, gigData, applicationsData] = all;
      setProfile(prev => ({...prev, employer: employerData.data}));
      setPosting(prev => ({...prev,
        gig: gigData.data,
        applications: applicationsData.data
      }));
    });
  }, []);

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
    const data = (<ApplicationCard key={'Application-modal-' + application.id} {...application} />);
		return (
      <Grid item xs={10} key={'Application-grid-' + application.id}>
        <Paper
          onClick={() => {
          setModalData(data);
          handleView();
        }} key={'Application-paper-' + application.id}>
          <ApplicationCard key={'Application-card-' + application.id}
            {...application}
          />
        </Paper>
      </Grid>
    );
  });

  return (
    <div className="gig-content">
      <h1>{job_title}</h1>
      <img src={photo_url} />
      <h2>Description</h2>
      <p>{description}</p>
      <p>
        Deadline:{' '}
        {new Date(deadline).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <p>Offer: {`$${pay} CAD`}</p>
      <div className="application-list">
        <Grid container direction='column' spacing={3}>
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
          {modalData}
        </Box>
      </Modal>
    </div>
  );
}
