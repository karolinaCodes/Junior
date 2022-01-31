import './styles/UserProjects.scss';
import {useContext} from 'react';

// components //
import PortfolioCard from '../components/PortfolioCard';
import PortfolioModal from '../components/PortfolioModal';

// context //
import {UserContext} from '../Providers/userProvider';

// mui //
import {Grid, Button, Card, CardActionArea, CardActions} from '@mui/material';

export default function UserProjects(props) {
  const {
    profile,
    setProfile,
    modalData,
    setModalData,
    openModal,
    setOpenModal,
    projects,
  } = props;
  const {currentUser} = useContext(UserContext);

  const handleView = () => {
    openModal === true ? setOpenModal(false) : setOpenModal(true);
  };

  const {first_name, last_name, id} = currentUser;

  const projectsArray = projects;
  // const parsedProjects = 'Test';
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
        lg={3}
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
                variant="contained"
                color="primary"
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
                variant="contained"
                color="primary"
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

  return parsedProjects;
}
