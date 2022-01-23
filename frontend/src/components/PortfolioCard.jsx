import './styles/PortfolioCard.scss';
import {CardContent, CardMedia} from '@mui/material';

export default function Profile(props) {
	const { title, description, thumbnail_photo_url, github_link, live_link } =
		props;
	const imgUrl = 'https://cdn.dribbble.com/users/409537/screenshots/14290034/media/965f91e1549a177acd63b8dced7592fa.png?compress=1&resize=1200x900&vertical=top';

	return (
		<CardContent>
			<h1>{title ? title : 'Untitled Project'}</h1>
			<CardMedia
				component="img"
				image={thumbnail_photo_url ? thumbnail_photo_url : imgUrl}
				alt={title ? title : 'Untitled Project'}
			/>
			<p className="description">{description ? description : 'No description'}</p>
		</CardContent>
	);
}
