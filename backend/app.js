const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db');
const dbHelpers = require('./helpers/dbHelpers')(db);
const devHelpers = require('./helpers/devHelpers')(db);
const employerHelpers = require('./helpers/employerHelpers')(db);
// const devHelpers = require('./helpers/devHelpers')(db);
// const devHelpers = require('./helpers/devHelpers')(db);
// const devHelpers = require('./helpers/devHelpers')(db);
// const devHelpers = require('./helpers/devHelpers')(db);
// const devHelpers = require('./helpers/devHelpers')(db);
// const devHelpers = require('./helpers/devHelpers')(db);
// const devHelpers = require('./helpers/devHelpers')(db);
// const devHelpers = require('./helpers/devHelpers')(db);
const app = express();
const bodyParser = require('body-parser');

// MIDDLEWARE
// use dotenv?
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const devsRouter = require('./routes/devs');
const employersRouter = require('./routes/employers');
const projectsRouter = require('./routes/projects');
const authRouter = require('./routes/auth');
const jobPostingsRouter = require('./routes/job_postings');
const gigPostingsRouter = require('./routes/gig_postings');
const jobApplicationsRouter = require('./routes/job_applications');
const gigApplicationsRouter = require('./routes/gig_applications');
const searchRouter = require('./routes/search');
// const authenticateRouter = require('./routes/authenticate');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use('/api/devs', devsRouter(devHelpers));
app.use('/api/employers', employersRouter(employerHelpers));
app.use('/api/projects', projectsRouter(dbHelpers));
app.use('/api/auth', authRouter(dbHelpers));
app.use('/api/job_postings', jobPostingsRouter(dbHelpers));
app.use('/api/gig_postings', gigPostingsRouter(dbHelpers));
app.use('/api/job_applications', jobApplicationsRouter(dbHelpers));
app.use('/api/gig_applications', gigApplicationsRouter(dbHelpers));
app.use('/api/search', searchRouter(dbHelpers));
// app.use('/api/authenticate', authenticateRouter(dbHelpers));

// app.use('/api/job_applications/:id', jobApplicationsRouter(dbHelpers)); // <- doesnt work

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

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
