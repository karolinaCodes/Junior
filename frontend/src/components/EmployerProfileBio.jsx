import './styles/EmployerProfileBio.scss';
import {useState, useEffect, useContext} from 'react';
import axios from 'axios';

// mui //
import {Chip, Grid, TextField} from '@mui/material';

// context //
import {UserContext} from '../Providers/userProvider';

export default function UserProfileHeader(props) {
  const {profile} = props;
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const [profileView, setProfileView] = useState('browse');
  const [editForm, setEditForm] = useState({
    ...currentUser,
  });

  useEffect(() => {
    setEditForm(prev => ({...prev, ...currentUser}));
  }, [currentUser]);

  const {email, company_name, bio, id} = currentUser;

  const {employer} = props;

  const updateProfile = () => {
    axios
      .post(`/api/employers/edit`, editForm)
      .then(res => {
        setCurrentUser(prev => ({...prev, ...editForm}));
        setProfileView('browse');
      })
      .catch(err => console.log(err));
  };

  const editProfile = () => {
    if (profileView !== 'edit') {
      setProfileView('edit');
    } else {
      updateProfile();
    }
  };

  return (
    <Grid container className="profile-bio" direction="column">
      <Grid item className="profile-pic"></Grid>
      {profileView === 'edit' && (
        <form onSubmit={editProfile}>
          <Grid item className="profile-links">
            <TextField
              size="small"
              multiline={true}
              maxRows={3}
              sx={{mt: '2vh', minWidth: '12vw'}}
              label="Company Name"
              value={editForm.company_name}
              onChange={e =>
                setEditForm({...editForm, company_name: e.target.value})
              }
            ></TextField>
            <TextField
              size="small"
              sx={{mt: '2vh', minWidth: '12vw'}}
              label="Email"
              value={editForm.email}
              onChange={e => setEditForm({...editForm, email: e.target.value})}
            ></TextField>
            <TextField
              size="small"
              sx={{mt: '2vh', minWidth: '12vw'}}
              label="Description"
              value={editForm.Bio}
              onChange={e => setEditForm({...editForm, bio: e.target.value})}
            ></TextField>
          </Grid>
          <Grid item className="profile-links">
            <h4>Email: {email}</h4>
            <h4>Job Postings: {profile.jobs.length}</h4>
            <h4>Gig Postings: {profile.gigs.length}</h4>
          </Grid>
          <Grid
            item
            className="profile-buttons"
            sx={{justifyContent: 'space-evenly'}}
          >
            <Chip label="Save" onClick={e => editProfile()} />
            <Chip label="Cancel" onClick={e => setProfileView('browse')} />
          </Grid>
        </form>
      )}
      {profileView === 'browse' && (
        <>
          <Grid item className="profile-name">
            <h3>About {employer.company_name}</h3>
            <h4>{employer.bio ? employer.bio : 'N/A'}</h4>
          </Grid>
          <Grid item className="profile-links">
            <h4>Job Postings: {profile.jobs.length}</h4>
            <h4>Gig Postings: {profile.gigs.length}</h4>
          </Grid>
          {id == employer.id && currentUser.company_name && (
            <Grid
              item
              className="profile-buttons"
              sx={{justifyContent: 'space-evenly'}}
            >
              <Chip onClick={e => editProfile()} label="Edit Info" />
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
}
