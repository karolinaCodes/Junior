import {useEffect} from 'react';
import './styles/NewJob.scss';
import axios from 'axios';

export default function NewJob(props) {
  useEffect(() => {
    axios
      .post('/api/job_applications/new', {
        job_posting_id: 1,
        junior_dev_id: 1,
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  });

  return (
    <div className="new-job-content">
      <div></div>
    </div>
  );
}
