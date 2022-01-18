import {useState, useEffect} from 'react';
import axios from 'axios';
import './styles/ApplyModal.scss';
import {Button, Modal, Box, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

export default function ApplyModal(props) {
  const {currentUser, jobApplying, handleClick} = props;
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState({
    dev: {},
  });
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

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

  // FOR TESTING
  const id = 1;
  //

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
    // job_posting_id, junior_dev_id
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
  // useEffect(() => {
  //   const devUrl = '/api/devs/' + id;
  //   axios.get(devUrl).then(profile => {
  //     setProfile(prev => ({
  //       ...prev,
  //       dev: profile.data,
  //     }));
  //   });
  // }, []);

  return (
    <div className="apply-modal">
      <Button onClick={handleClickandView} variant="contained">
        Apply
      </Button>
      <Modal
        open={open}
        onClose={handleView}
        // aria-labelledby='modal-modal-title'
        // aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          {applicationSubmitted ? (
            'Application Submitted'
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
                  <Link
                    to={{
                      pathname: '/profile',
                      state: {goBack: 'true'},
                    }}
                  >
                    Profile
                  </Link>
                </div>
                <div>
                  <h1>{`${currentUser.first_name} ${currentUser.last_name}`}</h1>
                  <h1>{currentUser.headline ? currentUser.headline : 'N/A'}</h1>
                  <h1> {currentUser.phone_number}</h1>
                  <h1> {currentUser.email}</h1>
                  <h1>
                    Github{' '}
                    {currentUser.github_url ? currentUser.github_url : 'N/A'}
                  </h1>
                  <h1>
                    Resume Link{' '}
                    {currentUser.resume_link ? currentUser.resume_link : 'N/A'}
                  </h1>
                  <h1>
                    LinkedIn{' '}
                    {currentUser.linkedIn_url
                      ? currentUser.linkedIn_url
                      : 'N/A'}
                  </h1>
                </div>
              </div>
            </section>
          )}
          {/* <Typography id='modal-modal-title' variant='h6' component='h2'>
							Text in a modal
						</Typography>
						<Typography id='modal-modal-description' sx={{ mt: 2 }}>
							Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
						</Typography> */}
          {applicationSubmitted ? null : (
            <Button variant="contained" onClick={submitApplication}>
              Submit Application
            </Button>
          )}
          <Button onClick={handleView} variant="contained">
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
