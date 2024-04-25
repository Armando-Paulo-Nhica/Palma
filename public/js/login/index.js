



function auth(user) {
    var requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
        body: JSON.stringify(user),
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
        
        if (!data.error) { 
          localStorage.setItem('token', data.token);
          if(isAdmin()){
            window.location.href = '/'; 
          }
          else
          {
            window.location.href = '/dashboard'; 
          }
          
        } else {
          swal("Mensagem", "Credenciais inválidas", "error");
          setTimeout(function () {
            swal.close();
          }, 3000);
        }
      })
      .catch((error) => {
        swal("Mensagem", "Credenciais inválidas", "error");
        setTimeout(function () {
          swal.close();
        }, 3000);
      }); 
}