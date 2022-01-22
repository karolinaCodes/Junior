// import './styles/LandingPage.scss';
import '../styles/JobView.scss';
import {Link} from 'react-router-dom';
import {TextField, Button, Modal, Box} from '@mui/material';
import {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

import axios from 'axios';

import ApplyModal from '../../components/JobSearch/ApplyModal';
import {UserContext} from '../../Providers/userProvider';

export default function LandingPage(props) {
  const {currentUser} = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const {job_id} = useParams();
  const [jobPosting, setJobPosting] = useState('');

  useEffect(() => {
    // get job posting info
    axios
      .get(`/api/job_postings/${job_id}`)
      .then(res => {
        console.log(res.data);
        setJobPosting(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    // get user info
    axios
      .get(`/api/devs/`)
      .then(res => {
        console.log(res.data);
        // setJobPosting(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

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

  return (
    <div className="gig-content">
      <h1 className="jobview-job-title">{jobPosting.job_title}</h1>
      <div className="job-details-logos">
        <div>
          {' '}
          <WorkOutlineOutlinedIcon />
          <span>{jobPosting.is_remote ? 'Remote' : jobPosting.city}</span>
        </div>
        <div>
          <FmdGoodOutlinedIcon />
          <span>{jobPosting.job_type}</span>
        </div>
        <div>
          <LocalOfferOutlinedIcon />
          <span>${jobPosting.salary}</span>
        </div>
      </div>
      <span className="posted-on">
        Posted{' '}
        {new Date(jobPosting.date_posted).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </span>
      <img src={jobPosting.photo_url} />
      <div className="job-desc-container">
        <div className="job-desc-img-pic">
          <div>
            <h2 id="desc-label">Description</h2>
            <p>{jobPosting.description}</p>
          </div>
          <div className="employer-pic-container">
            <img src={jobPosting.employer_photo_url} className="job-desc-img" />
            <p>{jobPosting.company_name} </p>
          </div>
        </div>
        <ApplyModal currentUser={currentUser} jobApplying={jobPosting} />
      </div>
    </div>
  );
}
