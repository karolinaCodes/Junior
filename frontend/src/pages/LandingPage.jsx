import './styles/LandingPage.scss';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

export default function LandingPage(props) {
	return (
		<div className='landing-wrapper'>
			<div id='landing-image'>
				<img
					src='images/landing-page-image.png'
					alt='Girl sitting at desk'
				></img>
			</div>
			<div className='landing-content'>
				<div className='search-wrapper'>
					<section className='title-text'>
						<h1 className='build'>Build Your Portfolio.</h1>
						<h1 className='get-paid'>Get Paid. Find Work.</h1>
					</section>
					<form className='search'>
						<TextField id='search-bar' label='Find Work' variant='outlined' />
						<Button variant='contained' size='large' href='/jobs'>
							SEARCH
						</Button>
					</form>
				</div>
			</div>
			<div className='footer'>
				<section>TinyApp</section>
				<section>Tweeter</section>
				<section>Jungle</section>
				<section>Vampr</section>
			</div>
		</div>
	);
}
