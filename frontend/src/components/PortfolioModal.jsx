import './styles/PortfolioCard.scss';
import { Button, CardActions, CardContent, CardMedia } from '@mui/material';

export default function Profile(props) {
	const { title, description, thumbnail_photo_url, github_link, live_link } =
		props;
	const imgUrl =
		'https://cdn.dribbble.com/users/409537/screenshots/14290034/media/965f91e1549a177acd63b8dced7592fa.png?compress=1&resize=1200x900&vertical=top';

	return (
		<>
			<h1>{title ? title : 'Untitled Project'}</h1>
			<CardMedia
				component='img'
				image={thumbnail_photo_url ? thumbnail_photo_url : imgUrl}
				alt={title ? title : 'Untitled Project'}
			/>
			<p className='description'>
				{description ? description : 'No description'}
			</p>
			<CardActions sx={{justifyContent: 'space-between'}}>
				<Button
					variant='contained'
					color='primary'
					className='modal-button'
					onClick={() =>
						github_link ? window.open(github_link, '_self') : null
					}
					disabled={!github_link}
				>
					Github
				</Button>
				<Button
					variant='contained'
					color='primary'
					className='modal-button'
					onClick={() => (live_link ? window.open(live_link, '_self') : null)}
					disabled={!live_link}
				>
					Live Link
				</Button>
			</CardActions>
		</>
	);
}
