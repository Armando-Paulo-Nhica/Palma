const express = require('express');
const router = express.Router();


router.get('/create', (req, res) => {
    res.render('sale/create.njk');
  });

  router.get('/view', (req, res) => {
    res.render('sale/index.njk');
  });


  module.exports = router;