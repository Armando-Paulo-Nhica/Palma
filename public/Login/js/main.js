
(function ($) {
    "use strict";
    const baseUrl = 'http://localhost:3000/api';

    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(e){
        var check = true;
        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

    if(check){
        var user = {
            username: $("#username").val(),
            password: $("#password").val()
           }
        auth(user);
    }
        e.preventDefault();
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
              window.location.href = '/'; 
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


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    
    function validate (input) {
        if($(input).attr('name') == 'username') {
            if($(input).val().trim() != '') {
                return false;
            }
        }
       

       return true; 
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).find('i').removeClass('zmdi-eye');
            $(this).find('i').addClass('zmdi-eye-off');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).find('i').addClass('zmdi-eye');
            $(this).find('i').removeClass('zmdi-eye-off');
            showPass = 0;
        }
        
    });


})(jQuery);