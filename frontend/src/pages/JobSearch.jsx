import {useEffect, useState} from 'react';
import './styles/JobSearch.scss';
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Modal} from '@mui/material';

import {Link} from 'react-router-dom';

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

export default function JobSearch(props) {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const [jobType, setJobType] = useState('');
  const [queryString, setQueryString] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [toggle, setToggle] = useState('jobs');
  const [open, setOpen] = useState(false);
  const [jobApplying, setJobApplying] = useState('');

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

  const handleChange = event => {
    setJobType(event.target.value);
  };

  const handleView = () => {
    open === true ? setOpen(false) : setOpen(true);
  };

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
    // console.log(queryString, city, jobType, toggle);
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
        // console.log(res.data);
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

  const openApplication = index => {
    const posting = searchResults[index];
    // console.log(posting);
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
          <hr />
          {/* Languages----------- */}
          <h4>Languages</h4>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  color="default"
                  size="small"
                  value="React"
                  // onClick={e => {
                  //   if (e.target.checked) {
                  //     setJobType(e.target.value);
                  //   } else {
                  //     setJobType('');
                  //   }
                  // }}
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
                  // onClick={e => {
                  //   console.log(e.target.value);
                  //   if (e.target.checked) {
                  //     setJobType(e.target.value);
                  //   } else {
                  //     setJobType('');
                  //   }
                  // }}
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
                  // onClick={e => {
                  //   if (e.target.checked) {
                  //     setJobType(e.target.value);
                  //   } else {
                  //     setJobType('');
                  //   }
                  // }}
                />
              }
              label="Angular"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="default"
                  size="small"
                  value="Java"
                  // onClick={e => {
                  //   if (e.target.checked) {
                  //     setJobType(e.target.value);
                  //   } else {
                  //     setJobType('');
                  //   }
                  // }}
                />
              }
              label="Java"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="default"
                  size="small"
                  value="Node.js"
                  // onClick={e => {
                  //   if (e.target.checked) {
                  //     setJobType(e.target.value);
                  //   } else {
                  //     setJobType('');
                  //   }
                  // }}
                />
              }
              label="Node.js"
            />
          </FormGroup>
        </div>
        <div className="searchResults-container">
          <h4>Recommended Jobs {searchResults.length}</h4>
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
                        {new Date(item.date_posted).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </Typography>
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
                      <Button
                        size="small"
                        variant="contained"
                        // // id={searchResults.indexOf(item)}
                        onClick={() =>
                          openApplication(searchResults.indexOf(item))
                        }
                      >
                        Apply
                      </Button>
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
                      <Modal
                        open={open}
                        onClose={handleView}
                        // aria-labelledby='modal-modal-title'
                        // aria-describedby='modal-modal-description'
                      >
                        <Box sx={style}>
                          <section className="profile-bio">
                            <h1>Apply for {jobApplying.job_title}</h1>
                            {/* <img id="profile-pic" src={photo_url} alt="Avatar"></img> */}
                            <section>
                              {/* <h1>Name: {`${first_name} ${last_name}`}</h1>
              <h1>Bio: {bio ? bio : 'N/A'}</h1>
            </section>
            <section>
              <h1>Email: {email}</h1>
              <h1>GitHub: {github_url ? github_url : 'N/A'}</h1>
              <h1>LinkedIn: {linkedIn_url ? linkedIn_url : 'N/A'}</h1>
              <h1>Resume: {resume_link ? resume_link : 'N/A'}</h1> */}
                            </section>
                          </section>
                          {/* <Typography id='modal-modal-title' variant='h6' component='h2'>
						Text in a modal
					</Typography>
					<Typography id='modal-modal-description' sx={{ mt: 2 }}>
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</Typography> */}
                          <Button onClick={handleView} variant="contained">
                            Close
                          </Button>
                        </Box>
                      </Modal>
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
