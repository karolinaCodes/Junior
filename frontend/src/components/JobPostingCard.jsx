import './styles/PortfolioCard.scss';

// mui //
import {
  Grid,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
} from '@mui/material';
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
    total_applications,
  } = props;

  return (
    <>
      <CardHeader title={job_title} subheader={formatted_date} />
      <CardContent>
        <Grid
          container
          direction="row"
          className="applicants-info"
          sx={{justifyContent: 'space-between'}}
        ></Grid>
        {photo_url && (
          <CardMedia component="img" image={photo_url} alt={job_title} />
        )}
        {city && (
          <p>
            <strong> {city}, Canada</strong> ({is_remote ? 'Remote' : 'On-site'}
            )
          </p>
        )}
        {salary && (
          <p>
            <strong>Salary: </strong>${formatted_salary} ({job_type})
          </p>
        )}
        {pay && (
          <p>
            <strong>Compensation:</strong> ${formatted_pay}
          </p>
        )}
        <p>
          <strong>Date Posted:</strong> {formatted_date}
        </p>
        <Grid
          container
          direction="row"
          className="applicants-info"
          sx={{justifyContent: 'space-between'}}
        >
          {is_open && (
            <Grid item>
              <p>
                <strong>
                  {' '}
                  {is_open
                    ? 'Accepting Applicants'
                    : 'Not Accepting Applicants'}
                </strong>
              </p>
            </Grid>
          )}
          <Grid item>
            <p>
              <strong>Total Applicants:</strong>{' '}
              {total_applications ? total_applications : '0'}
            </p>
          </Grid>
        </Grid>
        {deadline && (
          <p>
            <strong>Deadline:</strong> {formatted_deadline}
          </p>
        )}
        <p className="description">{description}</p>
      </CardContent>
    </>
  );
}
