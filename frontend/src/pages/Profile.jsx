import './styles/Profile.scss';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Providers/userProvider';
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
import UserProfileHeader from '../components/UserProfileHeader';
import UserProfileBio from '../components/UserProfileBio';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import UserProjects from '../components/UserProjects';

export default function Profile() {
	const { currentUser } = useContext(UserContext);
	const { state } = useLocation();
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
	}, [currentUser, openModal]);

	console.log('profile', profile);
	console.log('profile.projects:', profile.projects);

	return (
		<>
			<UserProfileHeader
				setModalData={setModalData}
				openModal={openModal}
				setOpenModal={setOpenModal}
			/>
			<div className='profile-content page-container'>
				<UserProfileBio />
				{profile.projects.length === 0 && <h1>No projects added</h1>}
				{goBack && (
					<Button
						variant='contained'
						color='primary'
						onClick={() => navigate(-1)}
					>
						Back to search results
					</Button>
				)}
				<section className='profile-cards'>
					<Grid container>
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
		</>
	);
}
