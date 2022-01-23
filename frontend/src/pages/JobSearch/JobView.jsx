// import './styles/LandingPage.scss';
import '../styles/JobView.scss';
import {Button} from '@mui/material';
import {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import ApplyModal from '../../components/JobSearch/ApplyModal';
import {UserContext} from '../../Providers/userProvider';
import {useNavigate} from 'react-router-dom';

// icons //
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

export default function LandingPage(props) {
  const {currentUser, savedJobsGigs, setSavedJobsGigs} =
    useContext(UserContext);
  const {jobs} = savedJobsGigs;
  const {job_id} = useParams();
  const [jobPosting, setJobPosting] = useState('');
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (jobs) {
      jobs.filter(job => job.job_posting_id === +job_id).length &&
        setSaved(true);
    }
  }, [jobs]);

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
  }, []);

  const saveJob = () => {
    if (saved) {
      return navigate('/saved');
    }

    axios
      .post('/api/save/', {
        devId: currentUser.id,
        jobGigId: +job_id,
        jobType: 'job',
      })
      .then(res => {
        console.log(res.data);
        setSaved(true);
        setSavedJobsGigs(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="gig-content page-container">
      <Button onClick={() => navigate(-1)}>Back To Search</Button>
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
          <h2 id="desc-label">Description</h2>
          <p>{jobPosting.description}</p>
          <div className="employer-pic-container">
            <img src={jobPosting.employer_photo_url} className="job-desc-img" />
            <p>{jobPosting.company_name} </p>
          </div>
        </div>
        <div className="posting-btn-container">
          <ApplyModal currentUser={currentUser} jobApplying={jobPosting} />
          <Button
            variant={saved ? 'contained' : 'outlined'}
            color={saved ? 'success' : 'primary'}
            onClick={saveJob}
          >
            {saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}{' '}
            {saved ? 'SAVED' : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
}
