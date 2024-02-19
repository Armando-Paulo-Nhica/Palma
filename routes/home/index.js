const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  
    res.render('home/index.njk');
  });

  router.get('/dashboard', (req, res) => {
  
    res.render('home/home.njk');
  });


  module.exports = router;