import './styles/LandingPage.scss';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

export default function LandingPage(props) {
	return (
		<div className='landing-wrapper'>
			<div id='landing-image'>
				<img
					src='images/landing-page-image.jpg'
					alt='Girl sitting at desk'
				></img>
			</div>
			<div className='landing-content'>
				<div className='title-text'>
					<h1 className='build'>Build Your Portfolio.</h1>
					<h1 className='get-paid'>Get Paid. Find Work.</h1>
				</div>
				<div className='search-bar'>
					<TextField id='outlined-basic' label='Find Work' variant='outlined' />
					<Button variant='contained' size='large' href='/jobs'>
						SEARCH
					</Button>
				</div>
			</div>
		</div>
	);
}
