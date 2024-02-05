const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('user/index.njk');
  });

router.get('/login', (req, res) => {

res.render('auth/login.njk');
});

router.get('/reset/pw', (req, res) => {

  res.render('auth/resetPass.njk');
  });


  module.exports = router;