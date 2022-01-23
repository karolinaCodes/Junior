import './styles/Profile.scss';
import {useEffect, useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserContext} from '../Providers/userProvider';
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
import PortfolioCard from '../components/PortfolioCard';
import PortfolioModal from '../components/PortfolioModal';
import UserProfileInfo from '../components/UserProfileInfo';
import axios from 'axios';
import {useLocation} from 'react-router-dom';

export default function Profile() {
  const {currentUser} = useContext(UserContext);
  const {state} = useLocation();
  const [goBack, setGoBack] = useState(state);
  const navigate = useNavigate();

  console.log(goBack);
  console.log('', currentUser);

  const [profile, setProfile] = useState({
    dev: {},
    projects: [],
  });
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState();

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
  }, [currentUser]);

  console.log('profile', profile);
  console.log('profile.projects:', profile.projects);

  const projectsArray = profile.projects;
  const parsedProjects = projectsArray.map(project => {
    const data = (
      <PortfolioModal
        key={'Project-modal-' + project.project_id}
        {...project}
      />
    );
    return (
      <Grid
        item
        xs={1}
        sm={6}
        md={4}
        key={'Project-grid-' + project.project_id}
      >
        <Grid
          container
          direction="column"
          key={'Project-grid-container-' + project.project_id}
        >
          <Card key={'Project-card-' + project.project_id}>
            <CardActionArea
              key={'Job-card-action' + project.project_id}
              onClick={() => {
                setModalData(data);
                handleView();
              }}
            >
              <PortfolioCard
                key={'Portfolio-card-' + project.project_id}
                {...project}
              />
            </CardActionArea>
            <CardActions key={'Job-card-actions-' + project.project_id}>
              <Button
                key={'Job-button-github-' + project.project_id}
                onClick={() =>
                  project.github_link
                    ? window.open(project.github_link, '_self')
                    : null
                }
                disabled={!project.github_link}
              >
                Github
              </Button>
              <Button
                key={'Job-button-live-' + project.project_id}
                onClick={() =>
                  project.live_link
                    ? window.open(project.live_link, '_self')
                    : null
                }
                disabled={!project.live_link}
              >
                Live Link
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  });

  return (
    <div className="profile-content page-container">
      <UserProfileInfo currentUser={currentUser} />
      {profile.projects.length === 0 && <h1>No projects added</h1>}
      {goBack && <Button onClick={() => navigate(-1)}>Back to search</Button>}
      <section className="profile-cards">
        <Grid container>
          <Grid item xs={12} id="profile-title">
            <h1>{`${first_name} ${last_name}`} Portfolio:</h1>
          </Grid>
          {parsedProjects}
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
  );
}
