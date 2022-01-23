const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
const bodyParser = require('body-parser');

const db = require('./db');
const devHelpers = require('./helpers/devHelpers')(db);
const employerHelpers = require('./helpers/employerHelpers')(db);
const gigPostingHelpers = require('./helpers/gigPostingHelpers')(db);
const gigApplicationHelpers = require('./helpers/gigApplicationHelpers')(db);
const jobApplicationHelpers = require('./helpers/jobApplicationHelpers')(db);
const jobPostingHelpers = require('./helpers/jobPostingHelpers')(db);
const projectHelpers = require('./helpers/projectHelpers')(db);
const searchHelpers = require('./helpers/searchHelpers')(db);
const sendEmail = require('./helpers/emailHelper.js');
const saveJobsGigsHelpers = require('./helpers/saveJobsGigsHelpers.js')(db);

// MIDDLEWARE
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true}));

// Separated Routes for each Resource
const devsRouter = require('./routes/devs');
const employersRouter = require('./routes/employers');
const projectsRouter = require('./routes/projects');
const authRouter = require('./routes/auth');
const jobPostingsRouter = require('./routes/job_postings');
const gigPostingsRouter = require('./routes/gig_postings');
const jobApplicationsRouter = require('./routes/job_applications');
const gigApplicationsRouter = require('./routes/gig_applications');
const searchRouter = require('./routes/search');
const saveRouter = require('./routes/save');

// Mount all resource routes
app.use('/api/auth', authRouter(devHelpers));
app.use('/api/devs', devsRouter(devHelpers));
app.use('/api/employers', employersRouter(employerHelpers));
app.use('/api/projects', projectsRouter(projectHelpers));
app.use('/api/job_postings', jobPostingsRouter(jobPostingHelpers));
app.use('/api/gig_postings', gigPostingsRouter(gigPostingHelpers));
app.use('/api/job_applications', jobApplicationsRouter(jobApplicationHelpers));
app.use('/api/gig_applications', gigApplicationsRouter(gigApplicationHelpers));
app.use('/api/search', searchRouter(searchHelpers));
app.use('/api/save', saveRouter(saveJobsGigsHelpers));

// Note: mount other resources here, using the same pattern above
app.post('/send_email', (req, res) => {
  const params = req.body.params;

  sendEmail(params).then(() => {
    res.send();
  });
});

// Home page
app.get('/', (req, res) => {
  res.render('index');
});

// EXAMPLES
// app.get('/api/candidates', (req, res) => {
// 	const candidates = [];

// 	res.json(candidates);
// });

// app.get('/api/candidates/:candidate_id', (req, res) => {
// 	const candidate = { name: 'Martin' };

// 	res.json(candidate);
// });

//EXAMPLE LOGIN IN ROUTE
//have authorization here
// app.post('/api/login', (req, res) => {
// 	const someUser = { name: 'Little Chicken' };
// 	res.cookie('name', 'Little Chicken');
// 	//add authentication here

// 	res.json(someUser);
// });

// EXAMPLE AUTHENTICATE ROUTE- DIFFERENT FROM LOGIN
// only reads the cookie and returns appropriate cookie based on the cookie- to use on first load- to persist login when use leaves our page
// app.post('/api/login', (req, res) => {
// 	const someUser = req.cookies.name ? { name: 'Little Chicken' } : null;
// 	//add authentication here

// 	res.json(someUser);
// });
module.exports = app;
