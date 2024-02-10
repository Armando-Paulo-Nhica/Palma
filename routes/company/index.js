const express = require('express');
const router = express.Router();


router.get('/profile', (req, res) => {
  
    res.render('company/profile.njk');
  });


  module.exports = router;