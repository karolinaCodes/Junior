const express = require('express');
const router = express.Router();

module.exports = ({getUserByEmail}) => {
  // get email and password from form
  // retrieve dev by email -with email and pw
  // authenticate if the password matches the pw then log them in
  router.post('/login', (req, res) => {
    const {email: submittedEmail, password: submittedPassword} = req.body;
    getUserByEmail(submittedEmail)
      .then(dev => {
        // authenticate
        if (dev.password === submittedPassword) {
          res.cookie('email', dev.email);
          res.json(dev);
        } else {
          res.json(false);
        }
      })
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  router.post('/check', (req, res) => {
    // get email from cookie
    const email = req.cookies.email;

    getUserByEmail(email)
      .then(dev => {
        res.json(dev);
      })
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  router.post('/logout', (req, res) => {
    res.clearCookie('email');
    res.send({});
  });

  return router;
};
