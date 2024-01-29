const express = require('express');
const router = express.Router();


// router.get('/create', (req, res) => {
//     res.render('lo.njk');
//   });

router.get('/login', (req, res) => {

res.render('login.njk');
});


  module.exports = router;