function sumTodaySales(){
    const token = localStorage.getItem('token');
    const baseUrl = localStorage.getItem('API_URL');
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
      fetch(baseUrl+'/sales/all/sales/'+getuserId(), reqToken)
          .then(response => response.json())
          .then(data => {
          if(!data.error){$("#todaySales").text(parseFloat(data.sum == null ? 0.00 : data.sum).toFixed(2))}
          })
          .catch(error => console.error('Error fetching data:', error));
  }

  function calcCost(){
    const token = localStorage.getItem('token');
    
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
      fetch(baseUrl+'/sales//my/cost/'+getuserId(), reqToken)
          .then(response => response.json())
          .then(data => {
          if(!data.error){
            $("#revenue").text(parseFloat( (data.sale == null ? 0 : data.sale) - data.cost).toFixed(2))
          }
          })
          .catch(error => console.error('Error fetching data:', error));
  }

  document.addEventListener('DOMContentLoaded', function() {
    sumTodaySales();
    calcCost();
    
});

function getuserId(){
    const token = localStorage.getItem('token');
    const [header, payload, signature] = token.split('.');
    const decodedPayload = atob(payload);
    const payloadData = JSON.parse(decodedPayload);
    return payloadData.user.id;
}