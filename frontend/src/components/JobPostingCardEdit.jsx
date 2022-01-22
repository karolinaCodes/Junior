import './styles/PortfolioCard.scss';
import {Grid, CardContent, CardHeader, CardMedia, IconButton} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Posting(props) {
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
    photo_url,
    total_applications
  } = props;

  return (
    <>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={job_title}
        subheader={formatted_date}
      />
      <CardContent>
        <Grid container direction='row' className="applicants-info" sx={{justifyContent: 'space-between'}}>
          {is_open && <Grid item>
            <p><strong>Accepting Applicants:</strong> {is_open ? 'Yes' : 'No'}</p>
          </Grid>}
          <Grid item>
            <p><strong>Total Applicants:</strong> {total_applications ? total_applications : '0'}</p>
          </Grid>
        </Grid>
        {photo_url && <CardMedia
          component="img"
          image={photo_url}
          alt={job_title}
          />}
        {city && <p> {city}, Canada ({is_remote ? 'Remote' : 'On-site'})</p>}
        {salary && <p>Salary: ${formatted_salary} ({job_type})</p>}
          {pay && <p><strong>Compensation:</strong> ${formatted_pay}</p>}
        <p>Date Posted: {formatted_date}</p>
        {deadline && <p>Deadline: {formatted_deadline}</p>}
        <p className="description">{description}</p>
      </CardContent>
    </>
  );
}
