const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db');

const app = express();

// MIDDLEWARE
// use dotenv?
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// EXAMPLES
app.get('/api/candidates', (req, res) => {
	const candidates = [];

	res.json(candidates);
});

app.get('/api/candidates/:candidate_id', (req, res) => {
	const candidate = { name: 'Martin' };

	res.json(candidate);
});

//EXAMPLE LOGIN IN ROUTE
//have authorization here
app.post('/api/login', (req, res) => {
	const someUser = { name: 'Little Chicken' };
	res.cookie('name', 'Little Chicken');
	//add authentication here

	res.json(someUser);
});

// EXAMPLE AUTHENTICATE ROUTE- DIFFERENT FROM LOGIN
// only reads the cookie and returns appropriate cookie based on the cookie- to use on first load- the persist login when use leaves our page
app.post('/api/login', (req, res) => {
	const someUser = req.cookies.name ? { name: 'Little Chicken' } : null;
	//add authentication here

	res.json(someUser);
});
module.exports = app;
