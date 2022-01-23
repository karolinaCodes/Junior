import './styles/SearchBar.scss';
import axios from 'axios';
import {TextField, Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {useState} from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';

export default function SearchBar(props) {
  const [jobType, setJobType] = useState('all');
  const [queryString, setQueryString] = useState('');

  let navigate = useNavigate();

  const handleChange = event => {
    setJobType(event.target.value);
  };

  const handleSubmit = e => {
    console.log(jobType, queryString);
    e.preventDefault();

    if (!jobType) {
      return;
    }

    if (jobType == 'all') {
      const results = axios
        .get('/api/search/query', {
          params: {
            queryString,
          },
        })
        .then(res => {
          // console.log(res.data);
          navigate('/jobs', {state: {data: res.data}});
          return;
        })
        .catch(err => console.log(err));
      return;
    }

    const results = axios
      .get('/api/search/multi-filter', {
        params: {
          queryString,
          toggle: jobType === 'All' ? '' : jobType,
        },
      })
      .then(res => {
        // console.log(res.data);
        navigate('/jobs', {state: {data: res.data}});
        return;
      })
      .catch(err => console.log(err));
    return;
  };

  const keyCheck = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  return (
    <form className="search">
      <Box sx={{minWidth: 120}}>
        <FormControl fullWidth>
          <Select value={jobType} onChange={handleChange}>
            <MenuItem value={'all'}>All</MenuItem>
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
  );
}
