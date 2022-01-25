import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import './styles/BuiltWith.scss';

const Item = styled(Paper)(({theme}) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BuiltWith(props) {
  return (
    <Box sx={{flexGrow: 1}} className="builtw-grid-container">
      <h1 id="builtw-title">Built with:</h1>
      <Grid container spacing={2}>
        <Grid item xs={6} className="builtw-item">
          <img
            className="builtw-img"
            src="https://www.vectorlogo.zone/logos/postgresql/postgresql-ar21.png"
          />
        </Grid>
        <Grid item xs={6}>
          <img
            className="builtw-img"
            src="https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lgyno4NC7rhy49BAEjN%2F-Lh14lb3LH4C886qWxYA%2F-Lh1DZeIUQennGd9RiHe%2FScreen%20Shot%202019-06-10%20at%2011.30.20%20AM.png?alt=media&token=784b79f6-81b5-4308-97a2-155afb9d496f"
          />
        </Grid>
        <Grid item xs={6}>
          <img
            className="builtw-img"
            src="https://www.webrexstudio.com/wp-content/uploads/2019/06/Node-js.jpg"
          />
        </Grid>
        <Grid item xs={6}>
          <img
            className="builtw-img"
            src="https://onextrapixel.com/wp-content/uploads/2016/04/reactjs-thumb.jpg"
          />
        </Grid>
        <Grid item xs={6}>
          <img
            className="builtw-img"
            src="https://yoheiko.com/wp-content/uploads/2021/03/image-13.png"
          />
        </Grid>
        <Grid item xs={6}>
          <img
            className="builtw-img"
            src="https://www.amocrm.com/static/images/pages/integrations/logo/twilio.png"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
