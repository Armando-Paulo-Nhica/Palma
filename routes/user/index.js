const express = require('express');
const router = express.Router();


// router.get('/create', (req, res) => {
//     res.render('lo.njk');
//   });

router.get('/login', (req, res) => {

res.render('auth/login.njk');
});

router.get('/reset/pw', (req, res) => {

  res.render('auth/resetPass.njk');
  });


  module.exports = router;