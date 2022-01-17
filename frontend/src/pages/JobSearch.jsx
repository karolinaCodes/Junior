import {useEffect, useState} from 'react';
import './styles/JobSearch.scss';
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

export default function JobSearch(props) {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const [jobType, setJobType] = useState('');
  const [queryString, setQueryString] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [toggle, setToggle] = useState('jobs');

  useEffect(() => {
    const results = axios
      .get('/api/search/query', {
        params: {
          queryString,
        },
      })
      .then(res => {
        console.log(res);
        setSearchResults(res.data);
        return;
      })
      .catch(err => console.log(err));
  }, [queryString]);

  // const searchByCity = city => {
  //   console.log(city);

  //   const results = axios
  //     .get('/api/search/city', {
  //       params: {
  //         city: city,
  //       },
  //     })
  //     .then(res => {
  //       console.log(res.data);
  //       setSearchResults(res.data);
  //       return;
  //     })
  //     .catch(err => console.log(err));
  // };

  // const searchByType = type => {
  //   console.log(type);
  //   const results = axios
  //     .get('/api/search/type', {
  //       params: {
  //         type: type,
  //       },
  //     })
  //     .then(res => {
  //       setSearchResults(res.data);
  //       return;
  //     })
  //     .catch(err => console.log(err));
  // };

  const handleChange = event => {
    setJobType(event.target.value);
  };

  const keyCheck = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };
  const handleSubmit = e => {
    console.log(queryString, city, jobType, toggle);
    e.preventDefault();
    const results = axios
      .get('/api/search/multi-filter', {
        params: {
          queryString,
          city,
          job_type: jobType,
          toggle,
        },
      })
      .then(res => {
        console.log(res.data);
        setSearchResults(res.data);
        return;
      })
      .catch(err => console.log(err));
  };

  const handleClick = e => {
    e.preventDefault();
    toggle === 'jobs' ? setToggle('gigs') : setToggle('jobs');
    setCity('');
    setJobType('');
    setQueryString('');
  };
  // useEffect(() => {
  // 	const results = axios
  // 		.get('/api/search/city', {
  // 			params: {
  // 				city: 'Toronto',
  // 			},
  // 		})
  // 		.then(res => {
  // 			console.log(res.data);
  // 			return res.data;
  // 		})
  // 		.catch(err => console.log(err));
  // 	axios
  // 		.get('/api/search/type', {
  // 			params: {
  // 				type: 'Part-time',
  // 			},
  // 		})
  // 		.then(res => {
  // 			console.log(res.data);
  // 		})
  // 		.catch(err => console.log(err));
  //   axios
  //     .post('/api/gig_applications/new', {gig_posting_id: 1, junior_dev_id: 1})
  //     .then(res => {
  //       console.log(res.data);
  //     })
  //     .catch(err => console.log(err));
  // }, []);
  return (
    <div className="jobsearch-content">
      <form className="search" onSubmit={handleSubmit}>
        <Button variant="contained" size="large" onClick={handleClick}>
          {`${toggle}`}
        </Button>
        <TextField
          id="search-bar"
          label="Search"
          variant="outlined"
          onChange={e => setQueryString(e.target.value)}
          value={queryString}
          onKeyDown={e => keyCheck(e)}
        />
        {toggle === 'jobs' ? (
          <TextField
            id="search-bar"
            label="City"
            variant="outlined"
            onChange={e => setCity(e.target.value)}
            value={city}
            onKeyDown={e => keyCheck(e)}
          />
        ) : null}
        {/* {toggle === 'jobs' ? (
          <Box sx={{minWidth: 120}}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Job Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={jobType}
                label="Job Type"
                onChange={handleChange}
              >
                <MenuItem value={'Full-time'}>Full-time</MenuItem>
                <MenuItem value={'Part-time'}>Part-time</MenuItem>
                <MenuItem value={'Internship'}>Internship</MenuItem>
                <MenuItem value={'Gig'}>Gig</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : null} */}
        <Button variant="contained" size="large" type="submit">
          FIND JOBS
        </Button>
      </form>
      <div className="main-content">
        <div className="checkboxes">
          <h3>Details</h3>
          <hr />
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
                      setJobType(e.target.value);
                    } else {
                      setJobType('');
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
                    console.log(e.target.value);
                    if (e.target.checked) {
                      setJobType(e.target.value);
                    } else {
                      setJobType('');
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
                      setJobType(e.target.value);
                    } else {
                      setJobType('');
                    }
                  }}
                />
              }
              label="Internship"
            />
          </FormGroup>
        </div>
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
                    <Typography gutterBottom variant="p" component="div">
                      {new Date(item.date_posted).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </Typography>
                  </div>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.job_title}
                    </Typography>

                    <Typography gutterBottom variant="h6" component="div">
                      {`${item.city}, Canada`}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="description"
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="contained">
                      Apply
                    </Button>
                    <Button size="small" variant="outlined">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
        </div>
        {/* {searchResults.gigs.length > 0 && (
        <div>
          <h1>Gigs:</h1>
          {searchResults.gigs.map(item => {
            return (
              <div>
                <p>{item.job_title}</p>
              </div>
            );
          })}
        </div>
      )} */}
      </div>
    </div>
  );
}
