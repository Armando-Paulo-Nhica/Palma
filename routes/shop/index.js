const express = require('express');
const router = express.Router();


router.get('/create', (req, res) => {
    res.render('shop/create.njk');
  });

router.get('/view', (req, res) => {
res.render('shop/index.njk');
});


  module.exports = router;