import './styles/Profile.scss';
import {Card, Grid} from '@mui/material';
import {useContext, useEffect, useState} from 'react';
import SavedJobsGigsCard from '../components/SavedJobsGigsCard';

import axios from 'axios';
import {UserContext} from '../Providers/userProvider';

export default function Applications(props) {
  const {currentUser} = useContext(UserContext);
  const [saved, setSaved] = useState({});

  useEffect(() => {
    if (currentUser) {
      axios
        .get(`/api/save/${currentUser.id}`)
        .then(res => {
          console.log(res.data);
          setSaved(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [currentUser]);

  console.log(saved.jobs);

  return (
    <div className="application-content">
      <Grid container direction="column">
        <h1>Saved</h1>
        <section className="application-cards">
          <h3>Saved Jobs</h3>
          <Grid container item>
            {saved.jobs &&
              saved.jobs.map(savedJob => {
                return (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    key={'SavedJobsGigs-grid-' + savedJob.job_posting_id}
                  >
                    <Card
                      className="card-click"
                      key={'SavedJobsGigs-paper-' + savedJob.job_posting_id}
                    >
                      <SavedJobsGigsCard
                        key={'SavedJobsGigs-card-' + savedJob.job_posting_id}
                        saved={savedJob}
                      />
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
          <h3>Saved Gigs</h3>
          <Grid container item>
            {saved.gigs &&
              saved.gigs.map(savedGig => {
                return (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    key={'SavedJobsGigs-grid-' + savedGig.gig_posting_id}
                  >
                    <Card
                      className="card-click"
                      key={'SavedJobsGigs-paper-' + savedGig.gig_posting_id}
                    >
                      <SavedJobsGigsCard
                        key={'SavedJobsGigs-card-' + savedGig.gig_posting_id}
                        saved={savedGig}
                      />
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </section>
      </Grid>
    </div>
  );
}
