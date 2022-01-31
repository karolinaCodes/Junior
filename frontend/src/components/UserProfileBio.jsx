import axios from 'axios';
import './styles/UserProfileBio.scss';
import {useState, useContext, useEffect} from 'react';

// mui //
import {Chip, Grid, TextField} from '@mui/material';
import {makeStyles} from '@mui/styles';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// context //
import {UserContext} from '../Providers/userProvider';

const useStyles = makeStyles({
  edit_chip: {background: '#E0EEFE'},
});

export default function UserProfileHeader(props) {
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const [profileView, setProfileView] = useState('browse');
  const [editForm, setEditForm] = useState({
    ...currentUser,
  });

  useEffect(() => {
    setEditForm(prev => ({...prev, ...currentUser}));
  }, [currentUser]);

  const {dev_id, user} = props;
  const {resume_url, github_url, linkedin_url, bio, id} = user;

  const updateProfile = () => {
    axios
      .post(`/api/devs/edit`, editForm)
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
      {profileView === 'edit' && (
        <form onSubmit={editProfile}>
          <Grid item className="profile-links">
            <TextField
              size="small"
              multiline={true}
              maxRows={3}
              sx={{minWidth: '12vw'}}
              label="Bio"
              value={editForm.bio}
              onChange={e => setEditForm({...editForm, bio: e.target.value})}
            ></TextField>
            <TextField
              size="small"
              sx={{mt: '2vh', minWidth: '12vw'}}
              label="Resume"
              value={editForm.resume_url}
              onChange={e =>
                setEditForm({...editForm, resume_url: e.target.value})
              }
            ></TextField>
            <TextField
              size="small"
              sx={{mt: '2vh', minWidth: '12vw'}}
              label="GitHub"
              value={editForm.github_url}
              onChange={e =>
                setEditForm({...editForm, github_url: e.target.value})
              }
            ></TextField>
            <TextField
              size="small"
              sx={{mt: '2vh', mb: '2vh', minWidth: '12vw'}}
              label="LinkedIn"
              value={editForm.linkedin_url}
              onChange={e =>
                setEditForm({...editForm, linkedin_url: e.target.value})
              }
            ></TextField>
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
          <Grid item className="profile-links">
            <h3>Bio</h3>
            <h4>{bio ? bio : 'N/A'}</h4>
            <div className="bio-icon-text">
              <FolderOpenIcon />
              <h4>
                <a href={resume_url}>Resume</a>
              </h4>
            </div>
            <div className="bio-icon-text">
              <GitHubIcon />
              <h4>
                <a href={github_url ? github_url : 'N/A'}>Github</a>
              </h4>
            </div>
            <div className="bio-icon-text">
              <LinkedInIcon />
              <h4>
                <a href={linkedin_url ? linkedin_url : 'N/A'}>LinkedIn</a>
              </h4>
            </div>
          </Grid>
          {currentUser.id == dev_id && currentUser.first_name && (
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
