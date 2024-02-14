function sumTodaySales(){
    const token = localStorage.getItem('token');
    const baseUrl = 'http://localhost:3000/api';
    var reqToken = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Include the Authorization header with the token
          'Authorization': `Bearer ${token}`,
          // Add any other headers if needed
        },
      };
      //Set data to datatable
      fetch(baseUrl+'/sales/all/sales', reqToken)
          .then(response => response.json())
          .then(data => {
            console.log(data)
          if(!data.error){$("#todaySales").text(data.sum == null ? 0 : data.sum)}
          })
          .catch(error => console.error('Error fetching data:', error));
  }

//   function countUsers(){
//     const token = localStorage.getItem('token');
//     const baseUrl = 'http://localhost:3000/api';
//     var reqToken = {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           // Include the Authorization header with the token
//           'Authorization': `Bearer ${token}`,
//           // Add any other headers if needed
//         },
//       };
    
//       //Set data to datatable
//       fetch(baseUrl+'/users/count/all', reqToken)
//           .then(response => response.json())
//           .then(data => {
//           if(!data.error){$("#countUsers").text(data.count)}
//           })
//           .catch(error => console.error('Error fetching data:', error));
//   }

  document.addEventListener('DOMContentLoaded', sumTodaySales);