import './styles/PortfolioCard.scss';
import {useState} from 'react';
import {styled} from '@mui/material/styles';
import {
  Grid,
  Button,
  IconButton,
  CardContent,
  CardActions,
  Collapse,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useNavigate} from 'react-router';

export default function SavedJobsGigsCard(props) {
  const {
    gig_posting_id,
    job_posting_id,
    company_name,
    formatted_date,
    description,
    job_title,
    job_type,
    photo_url,
    formatted_salary,
    formatted_pay,
    city,
    pay,
    formatted_deadline_date,
    is_remote,
  } = props.saved;

  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // For application expander (down arrow)
  const ExpandMore = styled(props => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
  })(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  return (
    <>
      <CardContent>
        <Grid container direction="row" className="stretch">
          <Grid item xs="auto" className="profile-pic">
            <img
              id="profile-pic"
              src={photo_url}
              alt={`Photo of ${company_name}`}
            />
            <h3>{company_name}</h3>
          </Grid>
          <Grid item container xs={10} direction="column">
            <Grid
              item
              container
              direction="row"
              sx={{justifyContent: 'space-between'}}
            >
              <Grid item xs={4}>
                {<h3>{job_title}</h3>}
                {city && (
                  <p>
                    {city}, Canada {is_remote && '(Remote)'}
                  </p>
                )}
                {formatted_salary && (
                  <p>
                    Salary: ${formatted_salary} ({job_type})
                  </p>
                )}
                {formatted_pay && <p>Compensation: ${formatted_pay}</p>}
                {formatted_date && <p>Date Posted: {formatted_date}</p>}
                {formatted_deadline_date && (
                  <p>Deadline: {formatted_deadline_date}</p>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <Grid container direction="row">
          <Grid item container xs>
            <Grid item>
              <Button
                color="success"
                onClick={() => {
                  gig_posting_id
                    ? navigate(`/gig/${gig_posting_id}`)
                    : navigate(`/job/${job_posting_id}`);
                }}
              >
                {`View ${gig_posting_id ? 'Gig' : 'Job'} Posting`}
              </Button>
            </Grid>
            <Grid item></Grid>
          </Grid>
          <Grid item className="expand-text">
            See More
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Grid>
        </Grid>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <p className="description">{description}</p>
        </CardContent>
      </Collapse>
    </>
  );
}
