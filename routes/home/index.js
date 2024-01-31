const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  
    res.render('home/index.njk');
  });


  module.exports = router;