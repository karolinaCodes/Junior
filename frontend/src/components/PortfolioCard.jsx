import './styles/PortfolioCard.scss';
import {CardContent, CardMedia} from '@mui/material';

export default function Profile(props) {
	const { title, description, thumbnail_photo_url, github_link, live_link } =
		props;

	return (
		<CardContent>
			<h1>{title}</h1>
			<CardMedia
				component="img"
				image={thumbnail_photo_url}
				alt={title}
			/>
			<p className="description">{description}</p>
		</CardContent>
	);
}
