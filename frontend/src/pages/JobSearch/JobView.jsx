// import './styles/LandingPage.scss';
import '../styles/JobView.scss';
import {Link} from 'react-router-dom';
import {TextField, Button, Modal, Box} from '@mui/material';
import {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

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

  const handleView = () => {
    open === true ? setOpen(false) : setOpen(true);
  };

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
      <h1>{jobPosting.job_title}</h1>
      <div>
        <WorkIcon />
        <span>{jobPosting.is_remote ? 'Remote' : jobPosting.city}</span>
        <LocationOnIcon />
        <span>{jobPosting.job_type}</span>
        <LocalOfferIcon />
        <span>${jobPosting.salary}</span>
      </div>
      <span>
        Posted{' '}
        {new Date(jobPosting.date_posted).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </span>
      <img src={jobPosting.photo_url} />
      <h2>Description</h2>
      <div className="job-description">
        <p>{jobPosting.description}</p>
        <img src={jobPosting.employer_photo_url} />
      </div>
      <ApplyModal currentUser={currentUser} jobApplying={jobPosting} />
    </div>
  );
}
