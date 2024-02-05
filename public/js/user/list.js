const token = localStorage.getItem('token');
const baseUrl = 'http://localhost:3000/api';

$(document).ready(function() {

  var rowId = 0;
  var counter = 0;
  var dataTable;

  
  //Catch the id
  $('#user').on('click', '[data-rowid]', function(event) {
      event.preventDefault();
      rowId = $(this).data('rowid');
      setSaleValues();
      viewSaleProducts();
  });

  //Delete the purchase
  $("#deleteBtn").click(function(){
        fetch(baseUrl+'/sales/' + rowId, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
      })
          .then(response => response.json())
          .then(data => {
        
                swal("Mensagem", "Venda eliminada com sucesso!", "success");
                loadAll();
                setTimeout(() => {
                    swal.close();
                  }, 1000);
              
          })
          .catch(error => {
              // Handle error if needed
              console.error('Error deleting purchase:', error);
          });
      
  })


//   Edit purchase
$("#createUser").click(function() {
   var fullname = $("#fullname");
   var email = $("#fullname");
   var username = $("#fullname");
   var password = $("#fullname");

  });


  function validate(name, message){
    name.next('.error-message').remove();
    name.after('<span class="error-message">' + message + '</span>');

}

// Update the purchase
function updateSale(saleData, id) {
    var requestOptions = {
        method: 'PUT', // Use PUT for updating data
        headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(saleData) // Convert data to JSON string
    };

    // Perform the fetch request
    fetch(`${baseUrl}/sales/${id}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            swal({
                title: "Mensagem",
                text: "Alterações feitas com sucesso!",
                icon: "success",
                timer: 2500,  // Set the time delay in milliseconds
                buttons: false  // Disable the "OK" button
              });
                loadAll();
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors here
        });
}

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
                          return '<div class="actions"><a href="#" data-toggle="modal" data-target="#detailModal" class="edit-btn"  data-rowid="' + row.id + '"><i class="fas fa-ellipsis-h"></i></a>' +
                              '<a href="#" data-toggle="modal" data-target="#editModal" class="edit-btn" data-rowid="' + row.id + '"><i class="fas fa-pen-to-square"></i></a>'+
                              '<a href="#" data-toggle="modal" data-target="#deleteModal" data-rowid="' + row.id + '"><i class="mdi mdi-delete md text-danger"></i></a></div>'
                              ;
                      }
                  },
                  // Add more columns as needed
              ]
          });
      })
      .catch(error => console.error('Error fetching data:', error));

  //Load all purchases
  function loadAll(){ 
    fetch(baseUrl+'/users')
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
              data: data.sale,
              columns: [
                { data: 'invoice' },
                { data: 'totalAmount' },
                { data: 'employer.fullname' },
                {
                    data: 'customer.fullname',
                    render: function(data, type, row) {
                        return data ? data : '----------------';
                    }
                },
                { data: 'createdAt',
                render: function (data, type, row) {
                  // Format the 'createdAt' date as dd-MM-YY
                    const formattedDate = new Date(data).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    });
                    return formattedDate;
                    }
                  },
                  {
                      data: null, // Placeholder for delete button
                      render: function(data, type, row) {
                          return '<div class="actions"><a href="#" data-toggle="modal" data-target="#detailModal" class="edit-btn"  data-rowid="' + row.id + '"><i class="fas fa-ellipsis-h"></i></a>' +
                              '<a href="#" data-toggle="modal" data-target="#editModal" class="edit-btn" data-rowid="' + row.id + '"><i class="fas fa-pen-to-square"></i></a>'+
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
