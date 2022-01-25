import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './styles/ProfileMenu.scss';
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { UserContext } from '../Providers/userProvider';
import { useContext } from 'react';
import NewJobPost from '../components/NewJobPost';
import NewGigPost from '../components/NewGigPost';

import { IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

export default function PositionedMenu(props) {
	const { setModalData, openModal, setOpenModal, profileView, setProfileView } =
		props;
	const { currentUser } = useContext(UserContext);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const navigate = useNavigate();
	const handleView = () => {
		openModal === true ? setOpenModal(false) : setOpenModal(true);
	};
	const newJobModal = <NewJobPost setOpenModal={setOpenModal} />;
	const newGigModal = <NewGigPost setOpenModal={setOpenModal} />;

	return (
		<div className='user-menu-container'>
			<div className='profile-info'>
				<IconButton
					onClick={handleClick}
					aria-label='settings'
					sx={{ mr: '7vw', mt: '2vh' }}
				>
					<MoreVert
						fontSize='large'
						sx={{ borderRadius: 50 }}
						aria-controls={open ? 'demo-positioned-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
					/>
				</IconButton>
			</div>
			<Menu
				id='demo-positioned-menu'
				aria-labelledby='demo-positioned-button'
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				{currentUser.company_name && (
					<div>
						<MenuItem
							onClick={e => {
								setModalData(newJobModal);
								handleView();
								handleClose();
							}}
						>
							Post Job
						</MenuItem>
						<MenuItem
							onClick={e => {
								setModalData(newGigModal);
								handleView();
								handleClose();
							}}
						>
							Post Gig
						</MenuItem>
						<MenuItem
							onClick={e => {
								setProfileView('postings');
								handleClose();
							}}
						>
							Postings
						</MenuItem>
					</div>
				)}
			</Menu>
		</div>
	);
}
