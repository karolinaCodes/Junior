const express = require('express');
const router = express.Router();

module.exports = ({getDevByEmail}) => {
  router.get('/', (req, res) => {
    res.render('login');
  });

  // get email and password from form
  // retrieve dev by email -with email and pw
  // authenticate if the password matches the pw then log them in

  router.post('/', (req, res) => {
    const {email: submittedEmail} = req.body;
    const {password: submittedPassword} = req.body;

    getDevByEmail(submittedEmail)
      .then(dev => {
        // authenticate
        if (dev.password === submittedPassword) {
          res.cookie('id', dev.id);
          console.log('Sucessful login!');
        } else {
          console.log('Unsuccessful login.');
        }
      })
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });
  return router;
};
