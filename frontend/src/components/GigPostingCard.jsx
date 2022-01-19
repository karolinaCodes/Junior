import './styles/PortfolioCard.scss';
import {CardMedia, CardContent, CardActionArea} from '@mui/material';

export default function Profile(props) {
	const { job_title, description, pay, date_posted, deadline, photo_url } =
		props;
	const type = props.type;
	const datePostedFormatted = new Date(date_posted).toLocaleDateString();
	const deadlineFormatted = new Date(deadline).toLocaleDateString();
	return (
		<CardActionArea>
			<CardContent>
				<h1>{job_title}</h1>
				<strong><p>Compensation: ${pay / 100.00}</p></strong>
				<CardMedia
					component="img"
					image={photo_url}
					alt={job_title}
				/>
				<strong><p>Date Posted: {datePostedFormatted}</p></strong>
				<strong><p>Deadline: {deadlineFormatted}</p></strong>
				<p>{description}</p>
			</CardContent>
		</CardActionArea>
	);
}
