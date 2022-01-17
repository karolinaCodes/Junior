import './styles/LandingPage.scss';
import {Link} from 'react-router-dom';
import {TextField, Button, Modal, Box} from '@mui/material';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import LoginForm from '../components/LoginForm';
import axios from 'axios';

export default function LandingPage(props) {
  const [open, setOpen] = useState(false);
  const {gig_id} = useParams();
  const [gigPosting, setGigPosting] = useState('');

  useEffect(() => {
    axios
      .get(`/api/gig_postings/${gig_id}`)
      .then(res => {
        console.log(res.data);
        setGigPosting(res.data);
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
      <h1>{gigPosting.gig_title}</h1>
      <img src={gigPosting.photo_url} />
      <h2>Description</h2>
      <p>{gigPosting.description}</p>
      <Button variant="contained" onClick={handleView}>
        Apply
      </Button>
      <Modal
        open={open}
        onClose={handleView}
        // aria-labelledby='modal-modal-title'
        // aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <section className="profile-bio">
            <h1>Apply for {gigPosting.gig_title}</h1>
            {/* <img id="profile-pic" src={photo_url} alt="Avatar"></img> */}
            <section>
              {/* <h1>Name: {`${first_name} ${last_name}`}</h1>
              <h1>Bio: {bio ? bio : 'N/A'}</h1>
            </section>
            <section>
              <h1>Email: {email}</h1>
              <h1>GitHub: {github_url ? github_url : 'N/A'}</h1>
              <h1>LinkedIn: {linkedIn_url ? linkedIn_url : 'N/A'}</h1>
              <h1>Resume: {resume_link ? resume_link : 'N/A'}</h1> */}
            </section>
          </section>
          {/* <Typography id='modal-modal-title' variant='h6' component='h2'>
						Text in a modal
					</Typography>
					<Typography id='modal-modal-description' sx={{ mt: 2 }}>
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</Typography> */}
          <Button onClick={handleView} variant="contained">
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
