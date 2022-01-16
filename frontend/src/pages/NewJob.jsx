import {useEffect} from 'react';
import './styles/NewJob.scss';
import axios from 'axios';

export default function NewJob(props) {
  useEffect(() => {
    axios.post('/api/job_applications/new').then(() => {});
  });
  return (
    <div className="new-job-content">
      <div></div>
    </div>
  );
}
