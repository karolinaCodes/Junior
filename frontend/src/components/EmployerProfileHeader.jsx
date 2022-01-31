import './styles/EmployerProfileHeader.scss';
import {useState, useEffect, useContext} from 'react';
import axios from 'axios';

// components //
import ProfileMenu from './EmployerProfileMenu';

// mui //
import {Chip, Grid, Input, TextField, IconButton} from '@mui/material';
import {
  PersonPinCircle,
  PhoneAndroid,
  Email,
  MoreVert,
} from '@mui/icons-material';

// context //
import {UserContext} from '../Providers/userProvider';

export default function UserProfileHeader(props) {
  const {
    setModalData,
    openModal,
    setOpenModal,
    setProfileView,
    profileView,
    employer_id,
    profile,
  } = props;
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const [profileEdit, setProfileEdit] = useState(false);
  const [editForm, setEditForm] = useState({
    ...currentUser,
  });

  useEffect(() => {
    setEditForm(prev => ({...prev, ...currentUser}));
  }, [currentUser]);

  const {company_name, email, bio, photo_url, id} = profile.employer;

  const updateProfile = () => {
    axios
      .post(`/api/employers/edit`, editForm)
      .then(res => {
        setCurrentUser(prev => ({...prev, ...editForm}));
        setProfileEdit(false);
      })
      .catch(err => console.log(err));
  };

  const editProfile = () => {
    if (!profileEdit) {
      setProfileEdit(true);
    } else {
      updateProfile();
    }
  };

  return (
    <>
      <img
        id="header-image"
        src="https://images.unsplash.com/photo-1536304228051-5ffee78924ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        alt="Avatar"
      ></img>
      <img id="portfolio-profile-pic" src={photo_url} alt="Avatar"></img>
      <Grid container direction="row" className="profile-header">
        {profileEdit === true && (
          <form onSubmit={editProfile}>
            <Grid item className="profile-name">
              <TextField
                size="small"
                sx={{mt: '2vh', minWidth: '12vw'}}
                label="Company Name"
                value={editForm.company_name}
                onChange={e =>
                  setEditForm({...editForm, company_name: e.target.value})
                }
              ></TextField>
              <TextField
                size="small"
                multiline={true}
                maxRows={3}
                sx={{mt: '2vh', minWidth: '12vw'}}
                label="Email"
                value={editForm.email}
                onChange={e =>
                  setEditForm({...editForm, email: e.target.value})
                }
              ></TextField>
            </Grid>
            <Grid item className="profile-links"></Grid>
            <Grid
              item
              className="profile-buttons"
              sx={{justifyContent: 'space-evenly'}}
            >
              <Chip label="Save" onClick={e => editProfile()} />
              <Chip label="Cancel" onClick={e => setProfileEdit(false)} />
            </Grid>
          </form>
        )}
        {profileEdit === false && (
          <Grid item container direction="column">
            <Grid item container>
              <Grid
                item
                container
                direction="row"
                sx={{justifyContent: 'space-between'}}
                id="profile-name"
              >
                <Grid item xs>
                  <h1>{company_name}</h1>
                </Grid>
                {currentUser.id == employer_id && currentUser.company_name && (
                  <Grid item id="kebab" sx={{justifySelf: 'flex-end'}}>
                    <ProfileMenu
                      setModalData={setModalData}
                      openModal={openModal}
                      setOpenModal={setOpenModal}
                      setProfileView={setProfileView}
                      profileView={profileView}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid
              item
              container
              id="contact-info"
              gap={5}
              direction="row"
              sx={{alignItems: 'center'}}
            >
              <Grid item>
                <h4>
                  <sub>
                    <Email />{' '}
                  </sub>
                  {email}
                </h4>
              </Grid>
            </Grid>
            {/* {currentUser.id == employer_id && currentUser.company_name && (
							<Grid
								item
								className='profile-buttons'
								sx={{ justifyContent: 'space-evenly' }}
							>
								<Chip onClick={e => editProfile()} label='Edit Info' />
							</Grid>
						)} */}
          </Grid>
        )}
      </Grid>
    </>
  );
}
