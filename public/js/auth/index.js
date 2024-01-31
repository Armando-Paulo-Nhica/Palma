const baseUrl = 'http://localhost:3000/api';

$("#login-btn").click(function(e){
    e.preventDefault();

   var user = {
    username: $("#username").val(),
    password: $("#password").val()
   }
   auth(user);
})

// Auth function


    function auth(data) {
        var requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Add any other headers if needed
            },
            body: JSON.stringify(data),
          };
          
          // Perform the fetch request
          fetch(baseUrl + '/users/auth', requestOptions)
          .then((response) => {
            if (!response.ok) {
              swal("Mensagem", data.message, "error");
              setTimeout(function () {
                swal.close();
              }, 3000);
            }
            return response.json();
          })
          .then((data) => {
            
            if (data.status === 200) { 
              localStorage.setItem('token', data.token);
              window.location.href = '/'; 
            } else {
              swal("Mensagem", "Credenciais inválidas", "error");
              setTimeout(function () {
                swal.close();
              }, 3000);
            }
          })
          .catch((error) => {
            swal("Mensagem", data.message, "error");
            setTimeout(function () {
              swal.close();
            }, 3000);
          });

          
    }

