const token = localStorage.getItem('token');
const baseUrl = localStorage.getItem('API_URL');
function getuserId(){
    const [header, payload, signature] = token.split('.');
    const decodedPayload = atob(payload);
    const payloadData = JSON.parse(decodedPayload);
    return payloadData.user.id;
}

// Fetch data
function loadSingleUser(){
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
      fetch(baseUrl+'/users/'+getuserId(), reqToken)
          .then(response => response.json())
          .then(data => {
            $(".user-name").text(data.fullname)
            $(".user-email").text(data.email)
            $(".user-role").text(data.isAdmin == true ? 'Administrador' : 'Funcionário')
            $("#nameUser").val(data.fullname)
            $("#emailE").val(data.email)
            $(".uname").val(data.username)
            $("#uname").text(data.username)
          })
          .catch(error => console.error('Error fetching data:', error));

          countMySales();
          countTodaySales();
}

document.addEventListener('DOMContentLoaded', loadSingleUser);

function countMySales(){
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
    fetch(baseUrl+'/sales/count/'+getuserId(), reqToken)
        .then(response => response.json())
        .then(data => {
        if(!data.error){$("#countSales").text(data.count)}
        })
        .catch(error => console.error('Error fetching data:', error));
}

function countTodaySales(){
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
    fetch(baseUrl+'/sales/today/'+getuserId(), reqToken)
        .then(response => response.json())
        .then(data => {
        if(!data.error){$("#countTodaySales").text(data.count)}
        })
        .catch(error => console.error('Error fetching data:', error));
}


// Edit profile
$("#editProfile").click(function(e){
  e.preventDefault();
  var name = $("#nameUser")
  var email = $("#emailE")
  var username = $("#unameE")
  var isOk = true;

  if(name.val().trim() === ''){
    isOk = false;
    validate(name, 'O nome é obrigatório')
  }
  if(email.val().trim() === ''){
    isOk = false;
    validate(email, 'O email é obrigatório')
  }
  if(username.val().trim() === ''){
    isOk = false;
    validate(username, 'O usuário é obrigatório')
  }

  if(isOk){
      var user = {
        fullname: name.val(),
        email: email.val(),
        username: username.val()
      }
      updateProfile(getuserId(), user);

  }
  
})


// Update profile function
function updateProfile(id, data){
      // Create new sale
      var requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data) // Convert data to JSON string
    };
    // Perform the fetch request
    fetch(baseUrl+'/users/'+id, requestOptions)
        .then(response => response.json())
        .then(data => {
            if(!data.error){
                swal("Mensagem", data.msg, "success");
                          loadSingleUser();
                          setTimeout(function () {
                              swal.close();
                          }, 2000);
               user = {};
               
            }
            else
            {
                swal("Mensagem", "Operação falhou, contacte a equipe técnica!", "error");
                setTimeout(function () {
                  swal.close();
              }, 2000);
            }
            
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors here
        });
}





function validate(name, message){
  name.next('.error-message').remove();
  name.after('<span class="error-message">' + message + '</span>');

}