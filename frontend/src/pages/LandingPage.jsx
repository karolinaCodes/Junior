import './styles/LandingPage.scss';
import {Link} from 'react-router-dom';
import {TextField, Button} from '@mui/material';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import LoginForm from '../components/LoginForm';

export default function LandingPage(props) {
  const {loginView, handleLoginView, currentUser, setCurrentUser} = props;
  const [jobType, setJobType] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [queryString, setQueryString] = useState('');

  console.log(jobType);
  console.log(queryString);
  let navigate = useNavigate();

  const handleChange = event => {
    setJobType(event.target.value);
  };

  const handleSubmit = e => {
    // console.log(queryString, city, schedule, jobType, value[0], value[1]);
    e.preventDefault();
    if (!jobType) {
      return;
    }
    // if (
    //   (!queryString && !city && !schedule && !jobType, !value[0], !value[1])
    // ) {
    const results = axios
      .get('/api/search/multi-filter', {
        params: {
          queryString,
          toggle: jobType === 'All' ? '' : jobType,
        },
      })
      .then(res => {
        console.log('heher', res.data);
        navigate('/jobs', {state: {data: res.data}});
        return;
      })
      .catch(err => console.log(err));
    return;
    // }

    // const results = axios
    //   .get('/api/search/multi-filter', {
    //     params: {
    //       queryString,
    //       city,
    //       job_type: schedule,
    //       toggle: jobType === 'All' ? '' : jobType,
    //       salary_min: value[0],
    //       salary_max: value[1],
    //     },
    //   })
    //   .then(res => {
    //     // console.log(res.data);
    //     setSearchResults(res.data);
    //     return;
    //   })
    //   .catch(err => console.log(err));
  };

  const keyCheck = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const searchView = () => {
    return (
      <div>
        <div id="white-box">
          <h1 className="build">Build Your Portfolio.</h1>
          <h1 className="get-paid">Get Paid. Find Work.</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            <br></br>
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <form className="search">
            <Box sx={{minWidth: 120}}>
              <FormControl fullWidth>
                <Select
                  value={jobType}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{'aria-label': 'Without label'}}
                >
                  <MenuItem disabled value="">
                    <em>Job Type</em>
                  </MenuItem>
                  <MenuItem value={'All'}>All</MenuItem>
                  <MenuItem value={'jobs'}>Jobs</MenuItem>
                  <MenuItem value={'gigs'}>Gigs</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TextField
              id="search-bar"
              label="Find Work"
              variant="outlined"
              onChange={e => setQueryString(e.target.value)}
              value={queryString}
              onKeyDown={e => keyCheck(e)}
            />
            <Button
              sx={{ml: '2rem'}}
              variant="contained"
              size="med"
              type="submit"
              onClick={handleSubmit}
            >
              SEARCH
            </Button>
          </form>
          <img src="images/homepage-brands.png" alt="trusted brands" />
        </div>
      </div>
    );
  };

  return (
    <div className="landing-wrapper">
      {loginView && (
        <LoginForm
          handleLoginView={handleLoginView}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )}
      {!loginView && searchView()}
    </div>
  );
}
