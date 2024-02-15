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
          if(!data.error){$("#todaySales").text(data.sum == null ? 0 : data.sum)}
          })
          .catch(error => console.error('Error fetching data:', error));
  }

  function calcCost(){
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
      fetch(baseUrl+'/sales/cost/get', reqToken)
          .then(response => response.json())
          .then(data => {
          if(!data.error){
            $("#revenue").text(parseFloat( (data.sale == null ? 0 : data.sale) - data.cost).toFixed(2))
          }
          })
          .catch(error => console.error('Error fetching data:', error));
  }

  // Last five manths
  function lastFiveMonths(){
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
      fetch(baseUrl+'/sales/fivemonths/get', reqToken)
          .then(response => response.json())
          .then(data => {
          if(!data.error){
            // $("#revenue").text(parseFloat( (data.sale == null ? 0 : data.sale) - data.cost).toFixed(2))
            console.log(data)
          }
          })
          .catch(error => console.error('Error fetching data:', error));
  }


  document.addEventListener('DOMContentLoaded', function() {
    sumTodaySales();
    calcCost();
    lastFiveMonths();
});
