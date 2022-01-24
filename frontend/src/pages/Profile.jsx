import './styles/Profile.scss';
import axios from 'axios';
import {useEffect, useState, useContext} from 'react';

// react router
import {useNavigate, useLocation} from 'react-router-dom';

// components
import UserProfileHeader from '../components/UserProfileHeader';
import UserProfileBio from '../components/UserProfileBio';
import UserProjects from '../components/UserProjects';
import UserApplications from '../components/UserApplications';
import SavedPostings from '../components/SavedJobsGigs';

// context
import {UserContext} from '../Providers/userProvider';

// mui
import {
  Grid,
  Button,
  Modal,
  Dialog,
  Box,
  Paper,
  Card,
  CardActionArea,
  CardActions,
} from '@mui/material';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles({
  back_btn: {
    color: '#182c5b',
    background: '#E0EEFE',
    'border-color': '#182c5b',
  },
});

export default function Profile() {
  const {currentUser} = useContext(UserContext);
  const {state} = useLocation();
  const [goBack, setGoBack] = useState(state);
  const navigate = useNavigate();
  const classes = useStyles();

  console.log('', currentUser);

  const [profile, setProfile] = useState({
    dev: {},
    projects: [],
  });
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState();
  const [profileView, setProfileView] = useState('projects');

  const handleView = () => {
    openModal === true ? setOpenModal(false) : setOpenModal(true);
  };

  const {first_name, last_name, id} = currentUser;

  useEffect(() => {
    if (id) {
      const devUrl = '/api/devs/' + id;
      const projectsByDevUrl = '/api/devs/' + id + '/projects';
      Promise.all([axios.get(devUrl), axios.get(projectsByDevUrl)]).then(
        all => {
          const [devData, projectsByDevData] = all;
          setProfile(prev => ({
            ...prev,
            dev: devData.data,
            projects: projectsByDevData.data,
          }));
        }
      );
    }
  }, [currentUser, openModal]);

  console.log('profile', profile);
  console.log('profile.projects:', profile.projects);

  const userProjects = (
    <UserProjects
      profile={profile}
      setProfile={setProfile}
      openModal={openModal}
      setOpenModal={setOpenModal}
      modalData={modalData}
      setModalData={setModalData}
      handleView={handleView}
      projects={profile.projects}
    />
  );

  const userApplications = <UserApplications />;

  const savedPostings = <SavedPostings />;

  return (
    <>
      <div>
        {goBack && (
          <div id="profile-back-btn">
            {' '}
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate(-1)}
              className={classes.back_btn}
            >
              Back to Posting
            </Button>
          </div>
        )}
        <UserProfileHeader
          setModalData={setModalData}
          openModal={openModal}
          setOpenModal={setOpenModal}
          profileView={profileView}
          setProfileView={setProfileView}
        />
      </div>
      <div className="profile-content page-container">
        <UserProfileBio />
        {profile.projects.length === 0 && <h1>No projects added</h1>}
        <section className="profile-cards">
          <Grid container>
            {profileView === 'projects' && userProjects}
            {profileView === 'applications' && userApplications}
            {profileView === 'saved' && savedPostings}
          </Grid>
        </section>
        <Dialog
          open={openModal}
          onClose={handleView}
          fullWidth={true}
          maxWidth={'md'}
        >
          <Box className="portfolio-modal">{modalData}</Box>
        </Dialog>
      </div>
    </>
  );
}
