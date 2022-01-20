import {useState, useEffect} from 'react';
import axios from 'axios';
import './styles/ApplyModal.scss';
import {Button, Modal, Box, Typography} from '@mui/material';
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
});

export default function ApplyModal(props) {
  const {currentUser, jobApplying, handleClick} = props;
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState({
    dev: {},
  });
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const classes = useStyles();

  const navigate = useNavigate();

  const handleView = () => {
    open === true ? setOpen(false) : setOpen(true);
  };

  const handleClickandView = () => {
    handleView();
    handleClick && handleClick();
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

  const {
    first_name,
    last_name,
    email,
    photo_url,
    github_url,
    linkedIn_url,
    bio,
    resume_link,
  } = profile.dev;

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
      <Modal open={open} onClose={handleView}>
        <Box sx={style}>
          {applicationSubmitted ? (
            <div>
              'Application Submitted'
              <div>
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Search More Jobs
                </Button>
                <Link to="/">
                  <Button variant="contained">View Application</Button>
                </Link>
              </div>
            </div>
          ) : (
            <section className="profile-bio">
              <h1>Apply for {jobApplying.job_title}</h1>
              <div className="profile-data">
                <div className="profile-pic">
                  <img
                    id="user-photo"
                    src={currentUser.photo_url}
                    alt="Avatar"
                  ></img>
                  <Link to="/profile">Profile</Link>
                </div>
                <div>
                  <h1>{`${currentUser.first_name} ${currentUser.last_name}`}</h1>
                  <h1>{currentUser.headline ? currentUser.headline : 'N/A'}</h1>
                  <h1> {currentUser.phone_number}</h1>
                  <h1> {currentUser.city}, Canada</h1>

                  <h1> {currentUser.email}</h1>
                  <h1>
                    Github{' '}
                    {currentUser.github_url ? currentUser.github_url : 'N/A'}
                  </h1>
                  <h1>
                    Resume Link{' '}
                    {currentUser.resume_url ? currentUser.resume_url : 'N/A'}
                  </h1>
                  <h1>
                    LinkedIn{' '}
                    {currentUser.linkedin_url
                      ? currentUser.linkedin_url
                      : 'N/A'}
                  </h1>
                </div>
              </div>
            </section>
          )}
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
        </Box>
      </Modal>
    </div>
  );
}
