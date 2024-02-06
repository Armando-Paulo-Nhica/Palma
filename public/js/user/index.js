$(document).ready(function() {
const token = localStorage.getItem('token');
const baseUrl = 'http://localhost:3000/api';

$(document).ready(function() {

  var rowId = 0;
  var counter = 0;
  var dataTable;
  loadAllUsers()
  
  //Catch the id
  $('#user').on('click', '[data-rowid]', function(event) {
      event.preventDefault();
      rowId = $(this).data('rowid');
      
      
  });

  //Delete the purchase
  $("#deleteBtn").click(function(){
        fetch(baseUrl+'/users/' + rowId, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
      })
          .then(response => response.json())
          .then(data => {
        
                if(!data.error){
                    swal("Mensagem", "Venda eliminada com sucesso!", "success");
                    loadAllUsers();
                    setTimeout(() => {
                        swal.close();
                    }, 2000);
                }
                else
                {
                    swal("Mensagem", "Operação falhou, contacte o técnico!", "error");
                    
                    setTimeout(() => {
                        swal.close();
                    }, 2000);
                }
              
          })
          .catch(error => {
              console.error('Error deleting purchase:', error);
          });
      
  })


//   Edit purchase
$("#createUser").click(function() {
    var fullname = $("#fullname");
    var email = $("#email");
    var username = $("#username");
    var password = $("#password");
    var isAdmin = $("#isAdmin");
    var isActive = $("#icon1").hasClass("fa-solid fa-circle-check") ? true : false;
    var isOk = true;

    if(fullname.val().trim() === ''){
            validate(fullname, "O nome é obrigatório");
            isOk = false;
        }

        if(email.val().trim() === ''){
            validate(email, "O e-mail é obrigatório");
            isOk = false;
        }

        if(username.val().trim() === ''){
            validate(username, "O nome do utilizador é obrigatório");
            isOk = false;
        }
        
        if(isAdmin.val() == null){
            validate(isAdmin, "Selecione a função");
            isOk = false;
        }

        if(isOk){
            var user = {
                "fullname": fullname.val(),
                "username": username.val(),
                "email": email.val(),
                "password": password.val(),
                "isAdmin": isAdmin.val() == 0 ? false : true,
                "isActive": isActive
            }

            createUser(user);
            
        }

  });


function validate(name, message){
name.next('.error-message').remove();
name.after('<span class="error-message">' + message + '</span>');
}

// Update the user
function createUser(user){
        var requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(user)
        };
        // Perform the fetch request
        fetch(baseUrl+'/users', requestOptions)
            .then(response => response.json())
            .then(data => {
                if(!data.error){
                    $("#fullname").val("");
                    $("#username").val("");
                    $("#email").val("");
                    user = {};
                    $("#addStaff").modal("hide")
                    swal("Mensagem", data.msg, "success");
                    setTimeout(function () {
                        swal.close();
                        loadAllUsers();
                    }, 2000);
                  
                  
                    
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
                
            });
}

// Update user role
$("#editUserRole").click(function(){
    const role = $("#role").val() == 0 ? false : true;
    const status = $("#icon2").hasClass("fa-solid fa-circle-check") ? true : false;

    updateUserRole(rowId, role, status);
})

function updateUserRole(id, role, status) {
    var requestOptions = {
        method: 'PUT', // Use PUT for updating data
        headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
            'Authorization': `Bearer ${token}`
        }
        
    };

    // Perform the fetch request
    fetch(`${baseUrl}/users/${id}/${role}/${status}`, requestOptions)
        .then(response => response.json())
        .then(data => {
                if(!data.error){
                    swal("Mensagem", data.msg, "success");
                    setTimeout(function() {
                        swal.close();
                    }, 2000);
                    loadAllUsers();
                }
                else
                {
                    swal("Mensagem", "Operação falhou, contacte o técnico", "error");
                    setTimeout(function() {
                        swal.close();
                    }, 2000);
                    
                }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors here
        });
}



function loadAllUsers(){
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
      fetch(baseUrl+'/users', reqToken)
          .then(response => response.json())
          .then(data => {
             if (dataTable) {
                dataTable.destroy();
              }
             
              dataTable = $('#user').DataTable({
                lengthMenu: [5,10, 25, 50, 75, 100],
                ordering: false,
                language: {
                    lengthMenu: 'Mostrar _MENU_ entradas',
                    paginate: {
                        next: '<i class="fas fa-arrow-right"></i>', 
                        previous: '<i class="fas fa-arrow-left"></i>'},
                        info: 'Ver _START_ à _END_ de _TOTAL_ entradas'
                },
                  data: data,
                  columns: [
                    { data: 'fullname' },
                    { data: 'username' },
                    { data: 'email' },
                    {
                        data: 'isAdmin',
                        render: function(data, type, row) {
                            return data ? 'Admin' : 'Funcionário';
                        }
                    },
                    {
                        data: 'isActive',
                        render: function(data, type, row) {
                            return data ? 'Ativo' : 'Inativo';
                        }
                    },
                    
                      {
                          data: null, // Placeholder for delete button
                          render: function(data, type, row) {
                              return '<div class="actions"><a href="#" data-toggle="modal" data-target="#editUser" class="edit-btn"  data-rowid="' + row.id + '"><i class="fas fa-pen-to-square"></i></a>' +
                                  '<a href="#" data-toggle="modal" data-target="#deleteModal" data-rowid="' + row.id + '"><i class="mdi mdi-delete md text-danger"></i></a></div>'
                                  ;
                          }
                      },
                      // Add more columns as needed
                  ]
              });
          })
          .catch(error => console.error('Error fetching data:', error));
}
 

});


});
