import {useEffect, useState} from 'react';
import './styles/JobSearch.scss';
import axios from 'axios';

import JobSearchCard from '../components/JobSearchCard';
import SearchBar from '../components/SearchBar';

export default function JobSearch(props) {
  const [query, setQeury] = useState('');

  useEffect(() => {
    // FOR TESTING ENDPOINTS
    // // SEARCH BY QUERY
    // axios
    //   .get('/api/search/query', {
    //     params: {
    //       queryString: 'JavaScript',
    //     },
    //   })
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(err => console.log(err));
    // // SEARCH BY CITY
    // axios
    //   .get('/api/search/city', {
    //     params: {
    //       city: 'Toronto',
    //     },
    //   })
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(err => console.log(err));

    // // SEARCH BY TYPE
    // axios
    //   .get('/api/search/type', {
    //     params: {
    //       type: 'Part-time',
    //     },
    //   })
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(err => console.log(err));

    // ALL JOB POSTINGS
    // axios
    //   .get('/api/job_postings')
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(err => console.log(err));
    // JOB POSTING BY ID
    // axios
    //   .get('/api/job_postings/1')
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(err => console.log(err));
    // JOB POSTINGS BY JOB APPLICATION ID
    // axios
    //   .get('/api/job_postings/1/applications')
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(err => console.log(err));
    // ADD NEW JOB APPLICATION
    axios
      .post('/api/job_postings/new', {
        employer_id: 1,
        job_title: 'UI-Developer',
        description: 'Implement our UI',
        city: 'Toronto',
        salary_min: 30000,
        salary_max: 60000,
        job_type: 'Part-time',
        is_remote: true,
        // left out is_open and date_posted -still works!
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  });

  return (
    <div className="jobsearch-content">
      <h1>Job Search Page</h1>
      <SearchBar />
    </div>
  );
}
