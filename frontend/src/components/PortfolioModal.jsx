import './styles/PortfolioModal.scss';
import { Grid, Paper, Button } from '@mui/material';

export default function PortfolioModal(props) {
	const { title, description, thumbnail_photo_url, github_link, live_link } =
		props;

	return (
		<Paper>
			<Grid container>
				<Grid item>
					<h1>{title}</h1>
				</Grid>
				<Grid item>
					<img src={thumbnail_photo_url} alt={title}></img>
				</Grid>
				<Grid container sx={{justifyContent: 'space-between'}}>
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
		</Paper>
	);
}
