import './styles/PortfolioCard.scss';
import {CardContent, CardMedia, CardActionArea} from '@mui/material';

export default function Profile(props) {
  const {
    job_title,
    description,
    city,
    salary,
    formatted_salary,
    job_type,
    is_remote,
    date_posted,
    formatted_date,
    is_open,
    pay,
    formatted_pay,
    deadline,
    formatted_deadline,
    photo_url
  } = props;

  return (
    <CardContent>
      <h1>{job_title}</h1>
      {pay && <strong><p>Compensation: ${pay / 100.00}</p></strong>}
      {photo_url && <CardMedia
				component="img"
				image={photo_url}
				alt={job_title}
			/>}
      {city && <p> {city}, Canada ({is_remote ? 'Remote' : 'On-site'})</p>}
      {salary && <p>Salary: ${formatted_salary} ({job_type})</p>}
      <p>Date Posted: {formatted_date}</p>
      {is_open && <p>Accepting Applicants: {is_open ? 'Yes' : 'No'}</p>}
			{deadline && <p>Deadline: {formatted_deadline}</p>}
      <p className="description">{description}</p>
    </CardContent>
  );
}
