import './styles/PortfolioModal.scss';

// mui //
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material';

export default function ApplicationCard(props) {
  const {
    job_title,
    description,
    salary,
    formatted_salary,
    date_posted,
    formatted_date,
    date_applied,
    formatted_date_applied,
    job_type,
    is_remote,
    employer_email,
    company_name,
    employer_bio,
    employer_photo_url,
    deadline,
    photo_url,
    city,
    pay,
    formatted_pay,
    formatted_deadline,
  } = props;
  const location = `${city} ${is_remote ? 'Remote' : 'On-site'}`;
  const formattedTypeOrDeadline = job_type
    ? job_type
    : `Deadline: ${formatted_deadline}`;

  return (
    <>
      <Grid item>
        <h1>{job_title}</h1>
      </Grid>
      <Grid container direction="row" className="profile-info">
        <Grid item className="profile-pic">
          <img
            id="profile-pic"
            src={employer_photo_url}
            alt={`Photo of ${company_name}`}
          />
          <p>{formatted_date_applied}</p>
        </Grid>
        <Grid item className="application-info">
          <List>
            <ListItemButton>
              <ListItem
                disablePadding
                onClick={() => window.open(`mailto:${employer_email}`, '_self')}
              >
                <ListItemText primary={`${company_name} (${employer_email})`} />
              </ListItem>
            </ListItemButton>
            {city && (
              <ListItemButton>
                <ListItem disablePadding>
                  <ListItemText primary={location} />
                </ListItem>
              </ListItemButton>
            )}
            <ListItemButton>
              <ListItem disablePadding>
                <ListItemText primary={`Salary: ${salary}`} />
              </ListItem>
            </ListItemButton>
            {date_posted && (
              <ListItemButton>
                <ListItem disablePadding>
                  <ListItemText primary={formatted_date} />
                </ListItem>
              </ListItemButton>
            )}
            <ListItem>
              <ListItemText primary={formattedTypeOrDeadline} />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  );
}
