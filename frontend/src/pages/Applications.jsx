import './styles/LandingPage.scss';
import {Card, Modal, Box, Grid, Paper, Dialog} from '@mui/material';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import ApplicationCard from '../components/ApplicationCard';
import ApplicationModal from '../components/ApplicationModal';

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

  const applicationsArray = posting.applications;
  const parsedApplications = applicationsArray.map(application => {
    const data = (
      <ApplicationModal
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
        <h1>Applications</h1>
        Total applications: {posting.applications.length}
        <section className="application-cards">
          <Grid item xs={12} container direction="column" rowSpacing={1}>
            {parsedApplications}
          </Grid>
        </section>
        <Dialog
          open={openModal}
          onClose={handleView}
          fullWidth={true}
          maxWidth={'md'}
        >
          <Box className="application-modal">{modalData}</Box>
        </Dialog>
      </div>
    </div>
  );
}
