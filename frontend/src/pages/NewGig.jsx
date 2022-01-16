import './styles/NewGig.scss';
import {useEffect} from 'react';
import axios from 'axios';

export default function NewGig(props) {
  // NEED TO TEST WHEN SARAH PUSHES THE API ENDPOINT
  //create new gig posting
  // useEffect(() => {
  //   axios
  //     .post('/api/gig_postings/new', {
  //       employer_id: 1,
  //       job_title: 'Create a landing page',
  //       description: 'Create a landing page for my company page',
  //       pay: 1000,
  //       deadline: '2022-02-19',
  //     })
  //     .then(res => {
  //       console.log(res.data);
  //     })
  //     .catch(err => console.log(err));
  // });

  return (
    <div className="new-gig-content">
      <div></div>
    </div>
  );
}
