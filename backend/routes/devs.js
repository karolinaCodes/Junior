const express = require('express');
const router = express.Router();
const {getPostsByUsers} = require('../helpers/dataHelpers');

module.exports = ({getDevs, getUserByEmail, addUser, getUsersPosts}) => {
  /* GET list of devs */
  router.get('/', (req, res) => {
    getDevs()
      .then(devs => res.json(devs))
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });
  return router;
};
