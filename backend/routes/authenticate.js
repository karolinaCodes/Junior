// NOT IN USE - ONLY NEED IF WANT TO PERSIST LOG IN IF USER LEAVES SITE
// const express = require('express');
// const router = express.Router();

// module.exports = () => {
//   // use on first load to read cookie and return appropriate cookie
//   // to persist login when use leaves our page
//   router.post('/', (req, res) => {
//     // send back the userId in the cookie if exists
//     const userId = req.cookies.id ? req.cookies.id : null;
//     res.json(userId);
//   });
//   return router;
// };
