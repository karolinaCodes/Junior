import './styles/NewGigPost.scss';
import axios from 'axios';
import {useContext, useEffect, useState} from 'react';

// react-router //
import {useNavigate} from 'react-router-dom';

// mui //
import {TextField, Button, Grid} from '@mui/material';

// context //
import {UserContext} from '../Providers/userProvider';

export default function NewGigPost(props) {
  const {setOpenModal} = props;
  const {currentUser} = useContext(UserContext);
  const [gigForm, setGigForm] = useState({
    employer_id: currentUser.id,
    job_title: 'New Gig',
    description: '',
    pay: '',
    deadline: '',
    photo_url:
      'https://www.elegantthemes.com/blog/wp-content/uploads/2020/02/000-Online-Code-Editors.png',
  });

  useEffect(() => {
    setGigForm({...gigForm, employer_id: currentUser.id});
  }, [currentUser]);

  const handleClose = () => {
    setOpenModal(false);
  };

  const postGig = e => {
    e.preventDefault();

    axios
      .post('/api/gig_postings/new', gigForm)
      .then(res => {
        console.log(res.data);
        setGigForm({
          employer_id: currentUser.id,
          job_title: '',
          description: '',
          pay: '',
          deadline: '',
          photo_url:
            'https://www.elegantthemes.com/blog/wp-content/uploads/2020/02/000-Online-Code-Editors.png',
        });
        handleClose();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const navigate = useNavigate();

  return (
    <form className="new-gig-form" onSubmit={postGig}>
      <h1>{gigForm.job_title}</h1>
      <img src={gigForm.photo_url} />
      <TextField
        id="gig-name"
        label="Gig Name"
        variant="filled"
        fullWidth
        sx={{mb: '1rem', backgroundColor: '#f6fafd'}}
        onChange={e => setGigForm({...gigForm, job_title: e.target.value})}
        value={gigForm.job_title}
      />
      <TextField
        id="photo-url"
        label="Thumbnail Photo"
        variant="filled"
        fullWidth
        sx={{backgroundColor: '#f6fafd'}}
        value={gigForm.photo_url}
        onChange={e => setGigForm({...gigForm, photo_url: e.target.value})}
      />
      <Grid
        container
        direction="row"
        id="first-row"
        xs={12}
        gap={2}
        sx={{mt: '1rem'}}
      >
        <Grid item xs>
          <TextField
            id="pay"
            label="Pay"
            variant="filled"
            fullWidth
            sx={{backgroundColor: '#f6fafd'}}
            type="number"
            value={gigForm.pay}
            onChange={e => setGigForm({...gigForm, pay: e.target.value})}
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="deadline"
            helperText="Deadline"
            type="date"
            variant="filled"
            fullWidth
            sx={{backgroundColor: '#f6fafd'}}
            value={gigForm.deadline}
            onChange={e => setGigForm({...gigForm, deadline: e.target.value})}
          />
        </Grid>
      </Grid>
      <TextField
        id="gig-description"
        label="Gig Description"
        variant="filled"
        fullWidth
        sx={{mb: '1rem', mt: '1rem', backgroundColor: '#f6fafd'}}
        multiline={true}
        minRows={5}
        value={gigForm.description}
        onChange={e => setGigForm({...gigForm, description: e.target.value})}
      />
      <div id="gig-buttons">
        {/* <Button variant='contained' size='large' type='submit' onClick={null}>
					Upload Images
				</Button> */}
        <Button
          id="post-gig"
          sx={{margin: 0}}
          variant="contained"
          size="large"
          type="submit"
          onClick={null}
        >
          Post Gig
        </Button>
        <Button
          id="cancel-gig"
          sx={{margin: 0}}
          variant="outlined"
          size="large"
          onClick={e => {
            handleClose();
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
