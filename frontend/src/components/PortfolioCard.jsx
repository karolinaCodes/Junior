import './styles/PortfolioCard.scss';
import { Paper } from '@mui/material';

export default function Profile(props) {
	const { title, description, thumbnail_photo_url, github_link, live_link } =
		props;

	return (
		<Paper sx={{height: '100%'}}>
			<h1>{title}</h1>
			<img src={thumbnail_photo_url} alt={title}></img>
			<p>{description}</p>
			<p>
				<a href={github_link} rel="noreferrer" target='_blank'>
					Github
				</a>
			</p>
			<p>
				<a href={live_link} rel="noreferrer" target='_blank'>
					Link
				</a>
			</p>
		</Paper>
	);
}
