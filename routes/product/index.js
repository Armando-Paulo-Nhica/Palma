const express = require('express');
const router = express.Router();


router.get('/create', (req, res) => {
    res.render('product/create.njk');
  });

  router.get('/view', (req, res) => {
    res.render('product/index.njk');
  });


  module.exports = router;