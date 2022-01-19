import './styles/LandingPage.scss';
import {Modal, Box, Grid, Paper} from '@mui/material';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import ApplicationCard from '../components/ApplicationCard';

import axios from 'axios';

export default function Applications(props) {
  // Get the posting id from url
  // const {employerid, posttype, postid} = useParams();
  const {posttype, postid} = useParams();
  // path="/:employerid/:type/:posting_id/applications"
  // Declare job or gig

  const [profile, setProfile] = useState({
    employer: {},
  });
  const [posting, setPosting] = useState({
    posting: {},
    applications: [],
  });

  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState();

  const handleView = () => {
    openModal === true ? setOpenModal(false) : setOpenModal(true);
  };

  // TESTING
  const employerid = 1;
  // TESTING

  useEffect(() => {
    const employerUrl = `/api/employers/${employerid}`;
    const postingUrl = `/api/${posttype}_postings/${postid}`;
    const applicationsUrl = `/api/${posttype}_postings/${postid}/applications`;
    Promise.all([
      axios.get(employerUrl),
      axios.get(postingUrl),
      axios.get(applicationsUrl),
    ]).then(all => {
      const [employerData, postingData, applicationsData] = all;
      setProfile(prev => ({...prev, employer: employerData.data}));
      setPosting(prev => ({
        ...prev,
        posting: postingData.data,
        applications: applicationsData.data,
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
    const data = (
      <ApplicationCard
        key={'Application-modal-' + application.junior_dev_id}
        {...application}
      />
    );
    return (
      <Grid item xs={10} key={'Application-grid-' + application.junior_dev_id}>
        <Paper
          onClick={() => {
            setModalData(data);
            handleView();
          }}
          key={'Application-paper-' + application.junior_dev_id}
        >
          <ApplicationCard
            key={'Application-card-' + application.junior_dev_id}
            {...application}
          />
        </Paper>
      </Grid>
    );
  });

  return (
    <div className="posting-content">
      <h1>{posting.posting.job_title}</h1>
      <h2>Description</h2>
      <p>{posting.posting.description}</p>
      <div>
        <p>
          Posted{' '}
          {new Date(posting.posting.date_posted).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
          {posting.posting.salary && ` $${posting.posting.salary}`}
          {posting.posting.pay && ` Offer: ${posting.posting.pay} CAD`}
        </p>
      </div>
      <div className="application-content">
        <Grid container direction="column" spacing={3}>
          <h1>Applications</h1>
          Total applications: {posting.applications.length}
          {parsedApplications}
        </Grid>
        <Modal open={openModal} onClose={handleView}>
          <Box sx={style}>{modalData}</Box>
        </Modal>
      </div>
    </div>
  );
}
