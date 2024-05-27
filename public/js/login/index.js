
if (!localStorage.getItem('API_URL')) {
  // Se não estiver definida, defina a variável API_URL e salve no localStorage
  // const apiUrl = "{{ apiUrl }}";
  localStorage.setItem('API_URL', window.API_URL);
}
const baseUrl = localStorage.getItem('API_URL');

$("#login-btn").click(function(e){
    e.preventDefault();
    const username = $("#username");
    const password = $("#password");
// console.log("ok")
    if(username.val() === "" || password.val() == ""){
        $(".msg").text("");
        $(".msg").addClass("resp").html("Preencha todos os campos!")
        
        setTimeout(function () {
            $(".msg").removeClass("resp").html("");
        }, 3000);
    }
    else{
        var user = {
            username: $("#username").val(),
            password: $("#password").val()
           }
           console.log(user)
        auth(user);
    }
});



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
          $(".msg").addClass("resp").html("Credenciais inválidas!")
          setTimeout(function () {
            $(".msg").removeClass("resp").html("");
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

          $(".msg").addClass("resp").html("Credenciais inválidas!")
          setTimeout(function () {
            $(".msg").removeClass("resp").html("");
          }, 3000);

        }
      })
      .catch((error) => {

        $(".msg").addClass("resp").html("Credenciais inválidas!")
        setTimeout(function () {
          $(".msg").removeClass("resp").html("");
        }, 3000);

      }); 
}



function isAdmin(){
    const token = localStorage.getItem('token');
    const [header, payload, signature] = token.split('.');
    const decodedPayload = atob(payload);
    const payloadData = JSON.parse(decodedPayload);
    return payloadData.user.isAdmin;
}

