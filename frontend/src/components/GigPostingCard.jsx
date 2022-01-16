import './styles/PortfolioCard.scss';
import { Grid, Paper } from '@mui/material';

export default function Profile(props) {
	const { title, description, thumbnail_photo_url, github_link, live_link } =
		props;

	return (
		<Paper>
			<h1>{title}</h1>
			<img src={thumbnail_photo_url}></img>
			<p>{description}</p>
			<p>
				<a href={github_link} target='_blank'>
					Github
				</a>
			</p>
			<p>
				<a href={live_link} target='_blank'>
					Link
				</a>
			</p>
		</Paper>
	);
}
