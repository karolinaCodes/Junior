import './styles/PortfolioModal.scss';
import { Grid, Paper, Button, CardMedia } from '@mui/material';

export default function PortfolioModal(props) {
	const { title, description, thumbnail_photo_url, github_link, live_link } =
		props;

	return (
		<Grid container>
			<Grid item>
				<h1>{title}</h1>
			</Grid>
			<Grid item>
				<CardMedia
					component="img"
					id='project-img'
					image={thumbnail_photo_url}
					alt={title}
				/>
			</Grid>
			<Grid container sx={{justifyContent: 'space-around'}}>
				<Grid item>
					<Button>
						<a href={github_link} rel="noreferrer" target='_blank'>
							Github
						</a>
					</Button>
				</Grid>
				<Grid item>
					<Button>
						<a href={live_link} rel="noreferrer" target='_blank'>
							Live Version
						</a>
					</Button>
				</Grid>
			</Grid>
			<Grid item>
				<p>{description}</p>
			</Grid>
		</Grid>
	);
}
