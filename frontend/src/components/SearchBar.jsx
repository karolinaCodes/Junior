import {useState} from 'react';
import './styles/SearchBar.scss';
import axios from 'axios';

// react-router //
import {useNavigate} from 'react-router-dom';

// mui //
import {TextField, Button} from '@mui/material';
import {makeStyles} from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';

const useStyles = makeStyles({
  dropdown: {
    background: '#f9f9f9',
    color: '#223d55',
    'font-weight': 500,
    'border-radius': '.8rem',
    height: '2.25rem',
    maxWidth: '115ch',
  },

  textfield: {
    border: 'none',
    // marginRight: '13rem',
    // '&:focus': {background: '#182c5b'},
    maxWidth: '40ch',
  },

  search_btn: {
    'font-size': '28px',
    color: '#223d55',
  },
});

export default function SearchBar(props) {
  const [jobType, setJobType] = useState('all');
  const [queryString, setQueryString] = useState('');

  let navigate = useNavigate();
  const classes = useStyles();

  const handleChange = event => {
    setJobType(event.target.value);
  };

  const handleSubmit = e => {
    console.log(jobType, queryString);
    e && e.preventDefault();

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
        navigate('/jobs', {state: {data: res.data}});
        return;
      })
      .catch(err => console.log(err));
    return;
  };

  const keyCheck = e => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  return (
    <form className="search">
      <Box sx={{minWidth: 120}}>
        <FormControl fullWidth className={classes.dropdown}>
          <Select
            value={jobType}
            onChange={handleChange}
            className={classes.dropdown}
          >
            <MenuItem value={'all'}>All Opportunities</MenuItem>
            <MenuItem value={'jobs'}>Jobs</MenuItem>
            <MenuItem value={'gigs'}>Gigs</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TextField
        id="search-bar"
        placeholder="Keywords, job title"
        label=""
        variant="outlined"
        onChange={e => setQueryString(e.target.value)}
        value={queryString}
        onKeyDown={e => keyCheck(e)}
        className={classes.textfield}
      />
      {/* <Button
        sx={{ml: '2rem'}}
        variant="contained"
        size="med"
        type="submit"
        
      > */}
      <div id="search-btn-container" onClick={handleSubmit}>
        {/* <SearchIcon className={classes.search_btn} /> */}
        <Button
          variant="contained"
          size="large"
          type="submit"
          // className={classes.search_btn}
        >
          Search
        </Button>
      </div>
      {/* </Button> */}
    </form>
  );
}
