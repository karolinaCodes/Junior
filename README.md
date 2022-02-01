# Junior

## Description

Junior is a full-stack web application that was created to facilitate junior developers in finding jobs that match their skill-level, boosting their resume through finding and completing gigs, and providing a way to easily showcase a portfolio of their completed projects. Junior also facilitates employers in finding junior developers to fill their roles by allowing employers to post jobs and gigs to the job board and allowing employers to manage their postings, manage their applications, and accept or decline applications.

### Stack
#### Back-end
- Express.js 
- Node.js
- PostgresSQL

#### Front-end
- React.js
- React-router
- SASS
- Material-UI
- Twilio

## Entity Relationship Diagram

![Junior](https://user-images.githubusercontent.com/82968631/152044478-f002bb6b-3411-4808-a2cb-7f5e07bae3ad.png)


## Design
### Whireframes
https://whimsical.com/junior-AvKXEBvKzgYM9r3wUTuaDF

### Mock-up
Mock-up was created using Figma.


## Dependencies

### Back end

```
sendgrid/mail: ^7.6.0,
cookie-parser: ^1.4.6,
debug: ~2.6.9,
express: ~4.16.1,
morgan: ~1.9.1,
pg: ^8.7.1,
pg-native: ^3.0.0
```

### Front end

```
date-io/date-fns: ^1.3.13,
emotion/core: ^11.0.0,
emotion/react: ^11.7.1,
emotion/styled: ^11.6.0,
mui/icons-material: ^5.2.5,
mui/lab: *,
mui/material: ^5.2.8,
mui/styles: ^5.3.0,
testing-library/jest-dom: ^5.16.1,
testing-library/react: ^12.1.2,
testing-library/user-event: ^13.5.0,
axios: ^0.24.0,
javascript-time-ago: ^2.3.10,
node-sass: ^7.0.1,
react: ^17.0.2,
react-dom: ^17.0.2,
react-icons: ^4.3.1,
react-router-dom: ^6.2.1,
react-scripts: 5.0.0,
react-time-ago: ^7.1.7,
react-timeago: ^6.2.1,
web-vitals: ^2.1.2
```

## Setup:

1. Clone the repository. In the terminal: 
```
git clone git@github.com:karolinaCodes/junior.git
```
2. Install back-end dependencies, seed the database and start back-end server:

```
cd /backend
npm install
npm run db:reset
npm start
```
The back-end will be served at http://localhost:3001/.

3. Install front-end dependencies and start the web server:

```
cd /frontend
npm install
npm start
```
The front-end will be served at http://localhost:3000/ , in your browser.

## Contributors
### Karolina Swislocki: https://github.com/karolinaCodes

### Sarah Dela Cruz: https://github.com/sarahdeecee

### Alexander Reyne: https://github.com/Alex-Reyne


