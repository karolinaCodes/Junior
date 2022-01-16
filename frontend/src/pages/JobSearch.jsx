import {useEffect} from 'react';
import './styles/JobSearch.scss';
import axios from 'axios';
import JobSearchCard from '../components/JobSearchCard';
import axios from 'axios';

export default function JobSearch(props) {
  // const data = {city: 'Saskatoon'};
  useEffect(() => {
    axios
      .get('/api/job_gig_search/city', {
        params: {
          city: 'Saskatoon',
        },
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  });

  return (
    <div className="jobsearch-content">
      <h1>Job Search Page</h1>
      <JobSearchCard />
    </div>
  );
}
