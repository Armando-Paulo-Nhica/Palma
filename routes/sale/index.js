const express = require('express');
const router = express.Router();


router.get('/create', (req, res) => {
    res.render('sale/create.njk');
  });


  module.exports = router;