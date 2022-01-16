import { useState } from 'react';
import './styles/PortfolioModal.scss';
import { Button, Modal, Box, Typography, makeStyles } from '@mui/material';

export default function PortfolioModal() {
	const [open, setOpen] = useState(false);

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

	const handleView = () => {
		open === true ? setOpen(false) : setOpen(true);
	};

	return (
		<div className='portfolio-modal'>
			<Button onClick={handleView} variant='contained'>
				Open modal
			</Button>
			<Modal
				open={open}
				onClose={handleView}
				// aria-labelledby='modal-modal-title'
				// aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<h1>HELLO</h1>
					{/* <Typography id='modal-modal-title' variant='h6' component='h2'>
						Text in a modal
					</Typography>
					<Typography id='modal-modal-description' sx={{ mt: 2 }}>
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</Typography> */}
					<Button onClick={handleView} variant='contained'>
						Close
					</Button>
				</Box>
			</Modal>
		</div>
	);
}
