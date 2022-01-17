import {useEffect, useState} from 'react';
import './styles/Profile.scss';
import {Grid, Paper, Box, Modal} from '@mui/material';
import PortfolioCard from '../components/PortfolioCard';
import PortfolioModal from '../components/PortfolioModal';
import axios from 'axios';

export default function Profile(props) {
  const [profile, setProfile] = useState({
    dev: {},
    projects: [],
  });
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState();

	const handleView = () => {
		openModal === true ? setOpenModal(false) : setOpenModal(true);
	};

  // FOR TESTING
  const id = 1;
  //

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

  // FOR TESTING ENDPOINTS
  // useEffect(() => {
  //	-retrieve a job application by application id
  //   axios
  //     .get('/api/job_applications/1')
  //     .then(res => {
  //       console.log(res.data);
  //     })
  //     .catch(err => console.log(err));

  //	-create a new job application
  // axios
  //   .get('/api/job_applications/new')
  //   .then(res => {
  //     console.log(res.data);
  //   })
  //   .catch(err => console.log(err));

  // get gig application based on gig application id
  // axios
  //   .get('/api/gig_applications/1')
  //   .then(res => {
  //     console.log(res.data);
  //   })
  //   .catch(err => console.log(err));
  // }, []);

  const {
    first_name,
    last_name,
    email,
    photo_url,
    github_url,
    linkedIn_url,
    bio,
  } = profile.dev;

  useEffect(() => {
    const devUrl = '/api/devs/' + id;
    const projectsByDevUrl = '/api/devs/' + id + '/projects';
    Promise.all([axios.get(devUrl), axios.get(projectsByDevUrl)]).then(all => {
      const [devData, projectsByDevData] = all;
      setProfile(prev => ({
        ...prev,
        dev: devData.data,
        projects: projectsByDevData.data,
      }));
    });
  }, []);

  const projectsArray = profile.projects;
	const parsedProjects = projectsArray.map(project => {
    const data = (<PortfolioModal key={'Project-modal-' + project.project_id} {...project} />);
		return (
      <Grid item xs={10} sm={6} md={4} key={'Project-grid-' + project.project_id}>
        <Paper sx={{height: '300px', overflow: 'hidden'}}
          onClick={() => {
          setModalData(data);
          handleView();
        }} key={'Project-paper-' + project.project_id}>
          <PortfolioCard key={'Portfolio-card-' + project.project_id}
            {...project}
          />
        </Paper>
      </Grid>
    );
  });

  return (
    <div className="profile-content">
      <section className="profile-bio">
        <img id="profile-pic" src={photo_url} alt="Avatar"></img>
        <section>
          <h1>Name: {`${first_name} ${last_name}`}</h1>
          <h1>Bio: {bio ? bio : 'N/A'}</h1>
        </section>
        <section>
          <h1>Email: {email}</h1>
          <h1>GitHub: {github_url ? github_url : 'N/A'}</h1>
          <h1>LinkedIn: {linkedIn_url ? linkedIn_url : 'N/A'}</h1>
        </section>
      </section>
      <section className="cards">
        <Grid container spacing={3}>
          {parsedProjects}
        </Grid>
      </section>
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
