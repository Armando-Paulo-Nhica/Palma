const token = localStorage.getItem('token');
const baseUrl = 'http://localhost:3000/api';

$(document).ready(function() {

  var rowId = 0;
  var counter = 0;
  var dataTable;

  
  //Catch the id
  $('#sell').on('click', '[data-rowid]', function(event) {
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
              'Authorization': `Bearer ${token}`,
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

// Setting values to modal
function setSaleValues() {
    var requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Include the Authorization header with the token
          'Authorization': `Bearer ${token}`,
          // Add any other headers if needed
        },
      };
    fetch(`${baseUrl}/sales/${rowId}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            const productsContainer = $("#editSale");
            productsContainer.empty(); // Clear existing content
            var productHtml = `
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6 mb-5">
                            <label>Referência da venda</label>
                            <input type="number" value="${data.invoice}" class="form-control" readonly>
                        </div>
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6 mb-5">
                            <label>Total pago</label>
                            <input type="number" value="${data.totalAmount}" class="form-control" readonly>
                        </div>
                        <input type="hidden" id="saleId" value="${data.id}" class="form-control">
                        <input type="hidden" id="customerId" value="${data.customerId}" class="form-control">
                        <input type="hidden" id="employerId" value="${data.employerId}" class="form-control">
                    `;
                productsContainer.append(productHtml);
               counter = data.items.length;
               
            for(let i = 0; i< counter; i++){
                productHtml = `<div class="row mx-2 mb-3" style="box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;">
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6">
                            <label>Nome do produto</label>
                            <input type="text" id="name`+ (i + 1) +`" value="${data.items[i].product.name}" class="form-control" readonly>
                        </div>
                        
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6">
                            <label>Preço</label>
                            <input type="number" min="1" id="sell`+(i + 1)+`" value="${data.items[i].product.sell}" class="form-control"readonly >
                        </div>
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6">
                            <label>Quantidade   </label>
                            <input type="number" min="1" id="quantity`+(i + 1)+`" value="${data.items[i].quantity}" class="form-control" >
                        </div>
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6">
                            <label>Subtotal</label>
                            <input type="number" id="subtotal`+(i + 1)+`" value = "${data.items[i].subTotal}" class="form-control" readonly>
                        </div>
                        <input type="hidden" id="productId`+(i + 1)+`" value="${data.items[i].product.id}">
                </div>
                `;
                productsContainer.append(productHtml);
                
            };

        })
        .catch(error => console.error('Error fetching data:', error));

}


// View purchase products
function viewSaleProducts() {
    fetch(`${baseUrl}/sales/${rowId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
        .then(response => response.json())
        .then(data => {
            const productsContainer = $("#saleItems");
            productsContainer.empty(); // Clear existing content
            var productHtml = `
            
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6 mb-5">
                            <label>Número de recibo</label>
                            <input type="number" value="${data.invoice}" class="form-control" readonly>
                        </div>
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6 mb-5">
                            <label>Total pago</label>
                            <input type="number" id="totalAmount" value="${data.totalAmount}" class="form-control" readonly>
                        </div>
                        
                        
                    `;
                productsContainer.append(productHtml);
               
            for(let i = 0; i< data.items.length; i++){
                productHtml = `<div class="row mx-2 mb-3" style="box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;">
                        <div class="form-group col-md-12 col-xxl-12 col-xl-12">
                            <label>Nome do produto</label>
                            <input type="text"  value="${data.items[i].product.name}" class="form-control" readonly>
                        </div>
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6">
                            <label>Preço</label>
                            <input type="number" value="${data.items[i].product.sell}" class="form-control" readonly>
                        </div>
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6">
                            <label>Quantidade</label>
                            <input type="number" value="${data.items[i].quantity}" class="form-control" readonly>
                        </div>
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6">
                            <label>Subtotal </label>
                            <input type="number" value="${data.items[i].subTotal}" class="form-control" readonly>
                        </div>
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6">
                            <label>Data de venda   </label>
                            <input type="text" class="form-control" value="${formatDateTime(data.createdAt)}" readonly>
                        </div>
                    
                    
                </div>
                `;
                productsContainer.append(productHtml);
                
            };

            // Add more code to set values for other elements if needed

        })
        .catch(error => console.error('Error fetching data:', error));


      
}


// Format date
function formatDateTime(dateString) {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
  
    const formattedDate = new Date(dateString).toLocaleString('en-GB', options);
    return formattedDate;
  }

//   Edit purchase
$("#edit-sale-btn").click(function() {
    var sale = {
      totalAmount: 0,
      customerId: parseInt($("#customerId").val(), 10),
      employerId: parseInt($("#employerId").val(), 10),
      items: []
    };

    for (let i = 0; i < counter; i++) {
      
      const quantity = parseInt($("#quantity" + (i+1)).val(), 10);      
      const productId = parseInt($("#productId"+(i+1)).val(), 10);
      const subTotal = parseFloat(quantity * $("#sell"+(i+1)).val()).toFixed(2);
      sale.items.push({
        subTotal,
        quantity,
        productId,
      });

        sale.totalAmount += parseFloat(subTotal);
    }
        sale.totalAmount = parseFloat(sale.totalAmount).toFixed(2);
        const id = parseInt($("#saleId").val(), 10);
        updateSale(sale, id);
        counter = 0;
        $("#editModal").modal("hide");

  });


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
  fetch(baseUrl+'/sales', reqToken)
      .then(response => response.json())
      .then(data => {
         if (dataTable) {
            dataTable.destroy();
          }
         
          dataTable = $('#sell').DataTable({
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

  //Load all purchases
  function loadAll(){ 
    fetch(baseUrl+'/sales',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      .then(response => response.json())
      .then(data => {
         if (dataTable) {
            dataTable.destroy();
          }
         
          dataTable = $('#sell').DataTable({
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
