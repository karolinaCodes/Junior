import * as React from 'react';
import {useEffect, useState, useContext} from 'react';
import '../styles/JobSearch.scss';
import axios from 'axios';

// components //
import ApplyModal from '../../components/JobSearch/ApplyModal';

// mui //
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {TextField, Button} from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Slider from '@mui/material/Slider';
import {InputAdornment} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import {makeStyles} from '@mui/styles';

// react-router //
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';

// context //
import {UserContext} from '../../Providers/userProvider';

// styles //
const useStyles = makeStyles({
  description: {
    overflow: 'hidden',
    display: ' -webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
    'margin-top': '10px',
    'font-family': 'Assistant',
    'line-height': '1.5rem',
  },

  job_title: {
    'font-family': 'Assistant',
    'font-weight': 600,
    'font-size': '1.4rem',
  },

  gig_chip: {
    background: '#66bb6a40',
  },

  job_chip: {
    background: '#8fcaf961',
  },

  city_deadline: {
    'font-weight': 600,
  },

  learn_more_btn: {
    width: '8.2rem',
    height: '2.5rem',
    'text-transform': 'none',
    color: '#192c5b',
    border: '1px solid #192c5b',
  },

  learn_more_link: {
    'text-decoration': 'none',
  },

  card: {
    'box-shadow': '0px 3px 8px rgb(8 35 48 / 5%)',
    'border-radius': '13px',
  },

  card_header: {
    display: 'flex',
    'justify-content': 'space-between',
    'align-items': 'center',
    'text-align': 'end',
  },

  checkbox: {
    padding: '0.2rem 0.3rem 0.2rem 0.2rem',
  },

  'search_query::placeholder': {
    'font-family': 'Assistant',
  },

  'search_query fieldset': {
    border: 'none',
  },

  drop_down: {
    width: '7.5rem',
    border: '1px solid #ced4da',
    'border-radius': '4px',
    padding: 0,
    width: '200px',
  },

  slider: {
    color: '#182c5b',
  },

  clear_btn: {
    'text-transform': 'none',
    color: '#182c5b',
    padding: '20px',
    height: '2.5rem',
  },

  search_btn: {
    'text-transform': 'none',
    color: '#f9f9f9',
    width: '7rem',
    height: '2.5rem',
    'margin-left': '10px',
    'text-transform': 'none',
    'background-color': '#182c5b',
  },

  form_actions: {
    'margin-left': '60px',
  },
});

export default function JobSearch(props) {
  const {currentUser} = useContext(UserContext);
  const {state} = useLocation();
  const [city, setCity] = useState('');
  const [schedule, setSchedule] = useState('');
  const [queryString, setQueryString] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [jobType, setJobType] = useState('all');
  const [open, setOpen] = useState(false);
  const [jobApplying, setJobApplying] = useState('');
  const [value, setValue] = useState([40000, 70000]);
  // value = salary range

  const classes = useStyles();

  useEffect(() => {
    if (state) {
      const {data} = state;
      return setSearchResults(data);
    }

    const results = axios
      .get('/api/search/query', {
        params: {
          queryString,
        },
      })
      .then(res => {
        setSearchResults(res.data);
        return;
      })
      .catch(err => console.log(err));
  }, []);

  const keyCheck = e => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = e => {
    console.log(queryString, city, schedule, jobType, value[0], value[1]);
    e.preventDefault();

    if (!queryString && !city && !schedule && !jobType) {
      return;
    }

    if (jobType === 'all') {
      const results = axios
        .get('/api/search/query', {
          params: {
            queryString,
          },
        })
        .then(res => {
          setSearchResults(res.data);
          return;
        })
        .catch(err => console.log(err));
      return;
    }

    const results = axios
      .get('/api/search/multi-filter', {
        params: {
          queryString,
          city: jobType === 'gigs' ? '' : city,
          job_type: jobType === 'gigs' ? '' : schedule,
          toggle: jobType,
          salary_min: jobType === 'gigs' ? '' : value[0],
          salary_max: jobType === 'gigs' ? '' : value[1],
        },
      })
      .then(res => {
        setSearchResults(res.data);
        return;
      })
      .catch(err => console.log(err));
  };

  const handleChange = event => {
    setJobType(event.target.value);
  };

  const handleSlider = (event, newValue) => {
    setValue(newValue);
  };

  const openApplication = index => {
    const posting = searchResults[index];
    console.log(posting);

    if (posting.deadline) {
      axios
        .get(`/api/gig_postings/${posting.id}`)
        .then(res => {
          setJobApplying(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      axios
        .get(`/api/job_postings/${posting.id}`)
        .then(res => {
          setJobApplying(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
    setOpen(true);
  };

  const clearFields = () => {
    setCity('');
    setSchedule('');
    setQueryString('');
    setJobType('');
    setValue([40000, 70000]);
  };

  return (
    <div className="page-container jobsearch-content">
      <form className="jobsearch-search" onSubmit={handleSubmit}>
        {/* {JOB TYPE DROPDOWN----------------------} */}
        <Box sx={{minWidth: 120}}>
          <FormControl fullWidth className={classes.drop_down}>
            <Select value={jobType} onChange={handleChange}>
              <MenuItem value={'all'}>All Opportunities</MenuItem>
              <MenuItem value={'jobs'}>Jobs</MenuItem>
              <MenuItem value={'gigs'}>Gigs</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TextField
          placeholder="Keywords, job title"
          onChange={e => setQueryString(e.target.value)}
          value={queryString}
          onKeyDown={e => keyCheck(e)}
          className={classes.search_query}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        ></TextField>
        <TextField
          disabled={jobType === 'gigs' || jobType === 'all'}
          id={(jobType === 'gigs' || jobType === 'all') && 'outlined-disabled'}
          label={(jobType === 'gigs' || jobType === 'all') && 'Disabled'}
          id="search-bar"
          variant="outlined"
          placeholder="City"
          onChange={e => setCity(e.target.value)}
          value={city}
          onKeyDown={e => keyCheck(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FmdGoodOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        {/* {SLIDER---------------------------------} */}
        <Box sx={{width: 300}}>
          <Typography
            id="non-linear-slider"
            gutterBottom
            className="salary-slider"
          >
            <span id="salary">Salary</span>{' '}
            <span id="salary-range"> {`$${value[0]} -$${value[1]}`}</span>
          </Typography>
          <Slider
            size="small"
            value={value}
            min={30000}
            max={80000}
            onChange={handleSlider}
            className={classes.slider}
            disabled={jobType === 'gigs' || jobType === 'all'}
          />
        </Box>
        <div className={classes.form_actions}>
          <Button
            variant="text"
            size="large"
            className={classes.clear_btn}
            onClick={clearFields}
          >
            Clear
          </Button>
          <Button
            variant="outlined"
            size="large"
            type="submit"
            className={classes.search_btn}
          >
            Search
          </Button>
        </div>
      </form>
      <div className="main-content">
        {/* {CHECKBOXES-------------------------------} */}
        <div className="checkboxes">
          <div className="checkboxes-section">
            <h3>Details</h3>
          </div>
          {/* {SCHEDULE---------------------------} */}
          <div className="checkboxes-section">
            <h4>Schedule</h4>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    className={classes.checkbox}
                    value="Full-time"
                    onClick={e => {
                      if (e.target.checked) {
                        setSchedule(e.target.value);
                      } else {
                        setSchedule('');
                      }
                    }}
                  />
                }
                label="Full-time"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    value="Part-time"
                    className={classes.checkbox}
                    onClick={e => {
                      if (e.target.checked) {
                        setSchedule(e.target.value);
                      } else {
                        setSchedule('');
                      }
                    }}
                  />
                }
                label="Part-time"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    value="Internship"
                    className={classes.checkbox}
                    onClick={e => {
                      if (e.target.checked) {
                        setSchedule(e.target.value);
                      } else {
                        setSchedule('');
                      }
                    }}
                  />
                }
                label="Internship"
              />
            </FormGroup>
          </div>
          {/* LANGUAGES--------------------------------- */}
          <div className="checkboxes-section">
            <h4>Languages</h4>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    value="React"
                    className={classes.checkbox}
                    onClick={e => {
                      console.log(e.target.value);
                      if (e.target.checked) {
                        setQueryString(e.target.value);
                      } else {
                        setQueryString('');
                      }
                    }}
                  />
                }
                label="React"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    value="JavaScript"
                    className={classes.checkbox}
                    onClick={e => {
                      console.log(e.target.value);
                      if (e.target.checked) {
                        setQueryString(e.target.value);
                      } else {
                        setSchedule('');
                      }
                    }}
                  />
                }
                label="JavaScript"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    value="Angular"
                    className={classes.checkbox}
                    onClick={e => {
                      console.log(e.target.value);
                      if (e.target.checked) {
                        setQueryString(e.target.value);
                      } else {
                        setSchedule('');
                      }
                    }}
                  />
                }
                label="Angular"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    value="SQL"
                    className={classes.checkbox}
                    onClick={e => {
                      console.log(e.target.value);
                      if (e.target.checked) {
                        setQueryString(e.target.value);
                      } else {
                        setSchedule('');
                      }
                    }}
                  />
                }
                label="SQL"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    value="Node.js"
                    className={classes.checkbox}
                    onClick={e => {
                      console.log(e.target.value);
                      if (e.target.checked) {
                        setQueryString(e.target.value);
                      } else {
                        setSchedule('');
                      }
                    }}
                  />
                }
                label="Node.js"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    value="C#"
                    className={classes.checkbox}
                    onClick={e => {
                      console.log(e.target.value);
                      if (e.target.checked) {
                        setQueryString(e.target.value);
                      } else {
                        setSchedule('');
                      }
                    }}
                  />
                }
                label="C#"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    value="Python"
                    className={classes.checkbox}
                    onClick={e => {
                      console.log(e.target.value);
                      if (e.target.checked) {
                        setQueryString(e.target.value);
                      } else {
                        setSchedule('');
                      }
                    }}
                  />
                }
                label="Python"
              />
            </FormGroup>
          </div>
        </div>

        {/* {SEARCH RESULTS---------------------------------} */}
        <div className="searchResults-container">
          <h3 id="recommended">
            <span>Recommended Jobs </span>
            <span id="recommended-num">{searchResults.length}</span>
          </h3>
          <div className="searchResults">
            {searchResults.length > 0 &&
              searchResults.map((item, index) => {
                return (
                  <Card
                    sx={{maxWidth: 345}}
                    className={classes.card}
                    key={index}
                  >
                    <div className="card-content">
                      <div className={classes.card_header}>
                        <CardMedia
                          component="img"
                          height="194"
                          image={item.employer_photo_url}
                          alt="Company Photo"
                          className="search-results-img"
                        />
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          className={classes.job_title}
                        >
                          {item.job_title}
                        </Typography>
                      </div>
                      <CardContent className="cart-text">
                        <Typography
                          gutterBottom
                          variant="h7"
                          component="div"
                          className={classes.city_deadline}
                        >
                          {item.city && `${item.city}, Canada`}
                          {item.deadline &&
                            `Deadline: ${new Date(
                              item.deadline
                            ).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}`}
                        </Typography>
                        {item.deadline ? (
                          <Chip
                            label="Gig"
                            color="success"
                            variant="outlined"
                            className={classes.gig_chip}
                          />
                        ) : (
                          <Chip
                            label="Job"
                            color="primary"
                            variant="outlined"
                            className={classes.job_chip}
                          />
                        )}
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          className={classes.description}
                        >
                          {item.description}
                        </Typography>
                      </CardContent>
                      <CardActions className="apply-btn">
                        <ApplyModal
                          currentUser={currentUser}
                          jobApplying={jobApplying}
                          handleClick={() =>
                            openApplication(searchResults.indexOf(item))
                          }
                        />
                        {item.deadline ? (
                          <Link
                            to={`/gig/${item.id}`}
                            className={classes.learn_more_link}
                          >
                            <Button
                              variant="outlined"
                              className={classes.learn_more_btn}
                            >
                              Learn More
                            </Button>
                          </Link>
                        ) : (
                          <Link
                            to={`/job/${item.id}`}
                            className={classes.learn_more_link}
                          >
                            <Button
                              variant="outlined"
                              className={classes.learn_more_btn}
                            >
                              Learn More
                            </Button>
                          </Link>
                        )}
                      </CardActions>
                    </div>
                  </Card>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
