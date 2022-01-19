import {useEffect, useState} from 'react';
import './styles/JobSearch.scss';
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import {Link} from 'react-router-dom';

import ApplyModal from '../components/ApplyModal';
import JobSearchCard from '../components/JobSearchCard';
import SearchBar from '../components/SearchBar';
import {TextField, Button} from '@mui/material';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import Slider from '@mui/material/Slider';

import {InputAdornment} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function JobSearch(props) {
  const {currentUser} = props;
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const [schedule, setSchedule] = useState('');
  const [queryString, setQueryString] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [jobType, setJobType] = useState('');
  const [open, setOpen] = useState(false);
  const [jobApplying, setJobApplying] = useState('');
  const [value, setValue] = React.useState([50000, 70000]);
  // value = salary range

  console.log(value);

  // TO ADD? every time queryString changes, make send new request, so changes as typing
  useEffect(() => {
    const results = axios
      .get('/api/search/query', {
        params: {
          queryString,
        },
      })
      .then(res => {
        // console.log(res.data);
        setSearchResults(res.data);
        return;
      })
      .catch(err => console.log(err));
  }, []);

  const style = {
    width: 1 / 2,
    height: 1 / 2,
    display: 'flex',
    flexDirection: 'column',
    margin: '10% 0 0 25%',
    background: '#223d55',
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '2rem',
  };

  const keyCheck = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };
  const handleSubmit = e => {
    console.log(queryString, city, schedule, jobType, value[0], value[1]);
    e.preventDefault();

    if (
      (!queryString && !city && !schedule && !jobType, !value[0], !value[1])
    ) {
      const results = axios
        .get('/api/search/query', {
          params: {
            queryString,
          },
        })
        .then(res => {
          console.log(res.data);
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
          city,
          job_type: schedule,
          toggle: jobType === 'All' ? '' : jobType,
          salary_min: value[0],
          salary_max: value[1],
        },
      })
      .then(res => {
        // console.log(res.data);
        setSearchResults(res.data);
        return;
      })
      .catch(err => console.log(err));
  };

  // const handleClick = e => {
  //   e.preventDefault();
  //   jobType === 'jobs' ? setjobType('gigs') : setjobType('jobs');
  //   setCity('');
  //   setSchedule('');
  //   setQueryString('');
  // };

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
          // console.log(res.data);
          setJobApplying(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      axios
        .get(`/api/job_postings/${posting.id}`)
        .then(res => {
          // console.log(res.data);
          setJobApplying(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
    setOpen(true);
  };

  return (
    <div className="jobsearch-content">
      <form className="jobsearch-search" onSubmit={handleSubmit}>
        {/* {JOB TYPE DROPDOWN----------------------} */}
        <Box sx={{minWidth: 120}}>
          <FormControl fullWidth>
            <Select
              value={jobType}
              onChange={handleChange}
              displayEmpty
              inputProps={{'aria-label': 'Without label'}}
            >
              <MenuItem value={'All'}>All</MenuItem>
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
          className="search-query"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        ></TextField>
        <TextField
          id="search-bar"
          variant="outlined"
          placeholder="City"
          onChange={e => setCity(e.target.value)}
          value={city}
          onKeyDown={e => keyCheck(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon />
              </InputAdornment>
            ),
          }}
        />
        {/* <input
          placeholder="City"
          onChange={e => setCity(e.target.value)}
          value={city}
          onKeyDown={e => keyCheck(e)}
        ></input> */}
        {/* <TextField
          id="search-bar"
          label="City"
          variant="outlined"
          
        /> */}
        {/* {SLIDER---------------------------------} */}
        <Box sx={{width: 300}}>
          <Typography
            id="non-linear-slider"
            gutterBottom
            className="salary-slider"
          >
            <span>Salary</span> <span> {`$${value[0]} -$${value[1]}`}</span>
          </Typography>
          <Slider
            size="small"
            color="info"
            value={value}
            min={40000}
            max={80000}
            onChange={handleSlider}
          />
        </Box>

        <Button variant="contained" size="large" type="submit">
          Search
        </Button>
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
                    size="small"
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
                    size="small"
                    value="Part-time"
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
                    size="small"
                    value="Internship"
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
                    size="small"
                    value="React"
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
                    size="small"
                    value="JavaScript"
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
                    size="small"
                    value="Angular"
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
                    size="small"
                    value="SQL"
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
                    size="small"
                    value="Node.js"
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
                    size="small"
                    value="C#"
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
                    size="small"
                    value="Python"
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
              searchResults.map(item => {
                return (
                  <Card sx={{maxWidth: 345}}>
                    <div className="card-header">
                      <CardMedia
                        component="img"
                        height="194"
                        image={item.employer_photo_url}
                        alt="Company Photo"
                      />
                    </div>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.job_title}
                      </Typography>
                      <Typography gutterBottom variant="h7" component="div">
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
                        <Chip label="Gig" color="success" />
                      ) : (
                        <Chip label="Job" color="primary" />
                      )}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className="description"
                      >
                        {item.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <ApplyModal
                        currentUser={currentUser}
                        jobApplying={jobApplying}
                        handleClick={() =>
                          openApplication(searchResults.indexOf(item))
                        }
                      />
                      {item.deadline ? (
                        <Link to={`/gig/${item.id}`}>
                          <Button size="small" variant="outlined">
                            Learn More
                          </Button>
                        </Link>
                      ) : (
                        <Link to={`/job/${item.id}`}>
                          <Button size="small" variant="outlined">
                            Learn More
                          </Button>
                        </Link>
                      )}
                    </CardActions>
                  </Card>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
