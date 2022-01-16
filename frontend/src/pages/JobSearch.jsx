import {useEffect, useState} from 'react';
import './styles/JobSearch.scss';
import axios from 'axios';

import JobSearchCard from '../components/JobSearchCard';
import SearchBar from '../components/SearchBar';

export default function JobSearch(props) {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({
    jobs: [],
    gigs: [],
  });

  const jobs = searchResults.jobs.map(item => {
    return (
      <div>
        <p>{item.job_title}</p>
      </div>
    );
  });
  const gigs = searchResults.gigs.map(item => {
    return (
      <div>
        <p>{item.job_title}</p>
      </div>
    );
  });

  useEffect(() => {
    const results = axios
      .get('/api/search/query', {
        params: {
          queryString: searchTerm,
        },
      })
      .then(res => {
        setSearchResults(prev => ({
          ...prev,
          jobs: res.data.jobs,
          gigs: res.data.gigs,
        }));
        return;
      })
      .catch(err => console.log(err));
  }, [searchTerm]);

  useEffect(() => {
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
    axios
      .post('/api/gig_applications/new', {gig_posting_id: 1, junior_dev_id: 1})
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  });

  return (
    <div className="jobsearch-content">
      <h1>Job Search Page</h1>
      <SearchBar
        state={query}
        onChange={e => setQuery(e.target.value)}
        onSubmit={() => setSearchTerm(query)}
      />
      {searchResults.jobs.length > 0 && (
        <div>
          <h1>Jobs:</h1>
          {jobs}
        </div>
      )}
      {searchResults.gigs.length > 0 && (
        <div>
          <h1>Gigs:</h1>
          {gigs}
        </div>
      )}
    </div>
  );
}
