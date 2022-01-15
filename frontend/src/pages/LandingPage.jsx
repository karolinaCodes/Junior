import './styles/LandingPage.scss';

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
					<input placeholder='Find Jobs'></input>
					<button>Search</button>
				</div>
			</div>
		</div>
	);
}
