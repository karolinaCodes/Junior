import { useEffect, useState } from 'react';
import './styles/Profile.scss';
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
import { useNavigate } from 'react-router-dom';

export default function Profile(props) {
	const { currentUser } = props;
	const navigate = useNavigate();

	const [profile, setProfile] = useState({
		dev: {},
		projects: [],
	});
	const [openModal, setOpenModal] = useState(false);
	const [modalData, setModalData] = useState();

	const handleView = () => {
		openModal === true ? setOpenModal(false) : setOpenModal(true);
	};

	const { first_name, last_name, id } = currentUser;

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
	}, [id]);

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
				lg={3}
				key={'Project-grid-' + project.project_id}
			>
				<Grid
					container
					direction='column'
					key={'Project-grid-container-' + project.project_id}
				>
					<Paper key={'Project-paper-' + project.project_id}>
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
									onClick={() => window.open(project.github_link, '_self')}
								>
									Github
								</Button>
								<Button
									key={'Job-button-live-' + project.project_id}
									onClick={() => window.open(project.live_link, '_self')}
								>
									Live Link
								</Button>
							</CardActions>
						</Card>
					</Paper>
				</Grid>
			</Grid>
		);
	});

	return (
		<div className='profile-content'>
			<Button
				variant='outlined'
				onClick={() => {
					navigate(-1);
				}}
			>
				GO BACK
			</Button>
			{/* <Grid container className="profile-bio" columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item className="profile-pic">
          <img id="profile-pic" src={photo_url} alt="Avatar"></img>
        </Grid>
        <Grid item className="profile-name">
          <h4>Name: {`${first_name} ${last_name}`}</h4>
          <h4>Bio: {bio ? bio : 'N/A'}</h4>
        </Grid>
        <Grid item className="profile-links">
          <h4>Email: {email}</h4>
          <h4>GitHub: {github_url ? github_url : 'N/A'}</h4>
          <h4>LinkedIn: {linkedIn_url ? linkedIn_url : 'N/A'}</h4>
        </Grid>
      </Grid> */}
			<UserProfileInfo currentUser={currentUser} />
			{profile.projects.length === 0 && <h1>No projects added</h1>}
			<section className='profile-cards'>
				<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
					<Grid item xs={12}>
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
				<Box className='portfolio-modal'>{modalData}</Box>
			</Dialog>
		</div>
	);
}
