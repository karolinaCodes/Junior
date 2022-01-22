import {useState} from 'react';
import axios from 'axios';
import '../styles/SearchResults/ApplyModal.scss';
import {Button, Box, Dialog} from '@mui/material';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import {FiGithub} from 'react-icons/fi';
import {AiOutlineFolderOpen, AiOutlineLinkedin} from 'react-icons/ai';
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
});

export default function ApplyModal(props) {
  const {currentUser, jobApplying, handleClick} = props;

  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const classes = useStyles();
  const navigate = useNavigate();

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
        return res.data;
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
      >
        <Box className={classes.apply_modal} id="apply-modal">
          {applicationSubmitted ? (
            <div className="submitted-container">
              <p id="submitted-msg">Application Submitted!</p>
              <div id="submitted-actions">
                <Button
                  variant="contained"
                  onClick={() => {
                    handleView();
                  }}
                >
                  Search More Jobs
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate('/profile/applications');
                  }}
                >
                  View Application
                </Button>
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
                    <LocalPhoneOutlinedIcon />
                    <h3 id="apply-phone"> {currentUser.phone_number}</h3>
                    <EmailOutlinedIcon />
                    <h3 id="apply-email"> {currentUser.email}</h3>
                    <FmdGoodOutlinedIcon />

                    <h3 id="apply-city"> {currentUser.city}, Canada</h3>
                  </div>
                  <div>
                    <FiGithub />
                    <h4>Github</h4>
                  </div>
                  <a
                    href={currentUser.github_url ? currentUser.github_url : ''}
                  >
                    {currentUser.github_url ? currentUser.github_url : 'N/A'}
                  </a>
                  <div>
                    <AiOutlineFolderOpen />
                    <h4>Resume Link </h4>
                    <a
                      href={
                        currentUser.resume_url ? currentUser.resume_url : ''
                      }
                    >
                      {currentUser.resume_url ? currentUser.resume_url : 'N/A'}
                    </a>
                  </div>
                  <div>
                    <AiOutlineLinkedin />
                    <h4>LinkedIn</h4>
                    <a
                      href={
                        currentUser.linkedin_url ? currentUser.linkedin_url : ''
                      }
                    >
                      {currentUser.linkedin_url
                        ? currentUser.linkedin_url
                        : 'N/A'}
                    </a>
                  </div>
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
