import {useState, useEffect} from 'react';
import axios from 'axios';
import '../styles/SearchResults/ApplyModal.scss';
import {Button, Box, Typography, Modal, Dialog} from '@mui/material';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles({
  apply_btn: {
    color: '#f9f9f9',
    'background-color': '#182c5b',
    height: '2.5rem',
    width: '8.2rem',
    'margin-right': '10px',
    'text-transform': 'none',
  },
  apply_modal: {
    'background-color': '#182c5b',
    color: 'white',
    display: 'flex;',
    'justify-content': 'center;',
  },
  see_applications: {
    'text-decoration': 'none',
  },
});

export default function ApplyModal(props) {
  const {currentUser, jobApplying, handleClick} = props;

  // const {
  //   first_name,
  //   last_name,
  //   email,
  //   photo_url,
  //   github_url,
  //   linkedIn_url,
  //   bio,
  //   resume_link,
  // } = profile.dev;

  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState({
    dev: {},
  });
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const classes = useStyles();

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const handleView = () => {
    openModal === true ? setOpenModal(false) : setOpenModal(true);
  };

  const handleClickandView = () => {
    handleView();
    handleClick && handleClick();
  };

  const submitApplication = () => {
    axios
      .post('/api/job_applications/new', {
        job_posting_id: jobApplying.id,
        junior_dev_id: currentUser.id,
      })
      .then(res => {
        console.log(res.data);
        setApplicationSubmitted(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="apply-modal">
      <Button
        onClick={handleClickandView}
        variant="contained"
        className={classes.apply_btn}
      >
        Apply
      </Button>

      <Dialog
        open={openModal}
        onClose={handleView}
        fullWidth={true}
        maxWidth={applicationSubmitted ? 'sm' : 'md'}
        // sx={{maxWidth: '2000px'}}
      >
        <Box className={classes.apply_modal}>
          {applicationSubmitted ? (
            <div class="submitted-container">
              <p id="submitted-msg">Application Submitted</p>
              <div id="submitted-actions">
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Search More Jobs
                </Button>
                <Link to="/" className={classes.see_applications}>
                  <Button variant="contained">View Application</Button>
                </Link>
              </div>
            </div>
          ) : (
            <section className="apply-profile-bio">
              <h1 id="job-title">Apply for {jobApplying.job_title}</h1>
              <div className="apply-profile-data">
                <div className="apply-profile-pic">
                  <img
                    id="apply-user-photo"
                    src={currentUser.photo_url}
                    alt="Avatar"
                  ></img>
                  <Link to="/profile">Profile</Link>
                </div>
                <div className="apply-user-info">
                  <h1 id="apply-name">{`${currentUser.first_name} ${currentUser.last_name}`}</h1>
                  <h2 id="apply-headline">
                    {currentUser.headline ? currentUser.headline : 'N/A'}
                  </h2>
                  <div className="apply-phone-city">
                    <h3 id="apply-phone"> {currentUser.phone_number}</h3>
                    <h3 id="apply-email"> {currentUser.email}</h3>
                    <h3 id="apply-city"> {currentUser.city}, Canada</h3>
                  </div>
                  <h4>Github</h4>
                  <p>
                    {currentUser.github_url ? currentUser.github_url : 'N/A'}
                  </p>
                  <h4>Resume Link </h4>
                  <p>
                    {currentUser.resume_url ? currentUser.resume_url : 'N/A'}
                  </p>
                  <h4>LinkedIn</h4>
                  <p>
                    {currentUser.linkedin_url
                      ? currentUser.linkedin_url
                      : 'N/A'}
                  </p>
                  <div className="btn-container">
                    {applicationSubmitted ? null : (
                      <Button variant="contained" onClick={submitApplication}>
                        Submit Application
                      </Button>
                    )}
                    {!applicationSubmitted && (
                      <Button onClick={handleView} variant="contained">
                        Close
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}
        </Box>
      </Dialog>
    </div>
  );
}
