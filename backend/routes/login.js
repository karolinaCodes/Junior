const express = require('express');
const router = express.Router();

module.exports = ({getUserByEmail}) => {
  // get email and password from form
  // retrieve dev by email -with email and pw
  // authenticate if the password matches the pw then log them in
  router.post('/', (req, res) => {
    const {email: submittedEmail} = req.body;
    const {password: submittedPassword} = req.body;

    getUserByEmail(submittedEmail)
      .then(dev => {
        // authenticate
        if (dev.password === submittedPassword) {
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

  return router;
};
