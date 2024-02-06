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

router.get('/profile', (req, res) => {
 
  res.render('user/profile.njk');
});


// function getUserId(){
//   const token = localStorage.getItem('token');
//     const [header, payload, signature] = token.split('.');
//     const decodedPayload = atob(payload);
//     const payloadData = JSON.parse(decodedPayload);
//     return payloadData.user.id;

// }

// function getUser(token, id){
//   var reqToken = {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//     };
  
//     //Set data to datatable
//     fetch(baseUrl+'/users/'+id, reqToken)
//         .then(response => response.json())
//         .then(data => {
//            return data;
//         })
//         .catch(error => console.error('Error fetching data:', error));
// }

  module.exports = router;