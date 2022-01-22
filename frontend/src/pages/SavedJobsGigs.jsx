import './styles/Profile.scss';
import {Card, Grid} from '@mui/material';
import {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import ApplicationCard from '../components/ApplicationCard';

import axios from 'axios';
import {UserContext} from '../Providers/userProvider';

export default function Applications(props) {
  const {currentUser} = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`/api/save/${currentUser.id}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  });

  // const parsedApplications = applicationsArray.map(application => {
  //   return (
  //     <Grid item xs={12} md={6} key={'Application-grid-' + application.id}>
  //       <Card
  //         className="card-click"
  //         key={'Application-paper-' + application.id}
  //       >
  //         <ApplicationCard
  //           key={'Application-card-' + application.id}
  //           type={posttype}
  //           {...application}
  //         />
  //       </Card>
  //     </Grid>
  //   );
  // });

  return (
    <div className="application-content">
      <Grid container direction="column">
        <h1>Saved</h1>
        <section className="application-cards">
          <Grid container item></Grid>
        </section>
      </Grid>
    </div>
  );
}
