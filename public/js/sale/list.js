const baseUrl = 'http://localhost:3000/api';

$(document).ready(function() {

  var rowId = 0;
  var counter = 0;
  var dataTable;
  var categories = [];
  var suppliers = [];
  var isNull = false;
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
    fetch(`${baseUrl}/sales/${rowId}`)
        .then(response => response.json())
        .then(data => {
            const productsContainer = $("#editSale");
            productsContainer.empty(); // Clear existing content
            var productHtml = `
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6 mb-5">
                            <label>Referência da venda</label>
                            <input type="number" value="${data.id}" class="form-control" readonly>
                        </div>
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6 mb-5">
                            <label>Total pago</label>
                            <input type="number" value="${data.totalAmount}" class="form-control" readonly>
                        </div>
                        <input type="hidden" value="${data.id}" class="form-control">
                    `;
                productsContainer.append(productHtml);
               
            for(let i = 0; i< data.items.length; i++){
                productHtml = `<div class="row mx-2 mb-3" style="box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;">
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6">
                            <label>Nome do produto</label>
                            <input type="text" id="name`+ (counter + 1) +`" value="${data.items[i].product.name}" class="form-control" readonly>
                        </div>
                        
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6">
                            <label>Valor de venda</label>
                            <input type="number" min="1" id="sell`+(counter + 1)+`" value="${data.items[i].product.sell}" class="form-control"readonly >
                        </div>
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6">
                            <label>Quantidade   </label>
                            <input type="number" min="1" id="quantity`+(counter + 1)+`" value="${data.items[i].product.quantity}" class="form-control" >
                        </div>
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6">
                            <label>Subtotal</label>
                            <input type="number" id="subtotal`+(counter + 1)+`" value = "${data.items[i].subTotal}" class="form-control" readonly>
                        </div>
                        <input type="hidden" id="productId`+(counter + 1)+`" value="${data.items[i].product.id}">
                </div>
                `;
                productsContainer.append(productHtml);
                counter++;
            };

            // Add more code to set values for other elements if needed

        })
        .catch(error => console.error('Error fetching data:', error));

}


// View purchase products
function viewSaleProducts() {
    fetch(`${baseUrl}/sales/${rowId}`)
        .then(response => response.json())
        .then(data => {
            const productsContainer = $("#saleItems");
            productsContainer.empty(); // Clear existing content
            var productHtml = `
            
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6 mb-5">
                            <label>Número de recibo</label>
                            <input type="number" value="${data.id}" class="form-control" readonly>
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
                counter++;
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


  // Fill the modal to edit
  fetch(baseUrl+'/categories')
  .then(response => response.json()) 
  .then(data => {
    categories = data;
      
  })
  .catch(error => {
      console.error('Error fetching data:', error);
  });


  fetch(baseUrl+'/suppliers')
  .then(response => response.json()) 
  .then(data => {
      suppliers = data;
      
  })
  .catch(error => {
      console.error('Error fetching data:', error);
  });




//   Edit purchase
$("#edit-sale-btn").click(function() {
    var purchase = {
      totalAmount: parseFloat($("#totalAmount").val()).toFixed(2),
      customerId: 1,
      employerId: 1,
      items: []
    };

    for (var i = 0; i < counter; i++) {
        purchase.totalShop += ($("#quantity" + (i+1)).val() * $("#shop" + (i+1)).val());
  
      const quantity = parseInt($("#quantity" + (i+1)).val(), 10);
      const name = $("#name" + (i+1)).val();
      const sell = $("#sell" + (i+1)).val();
      const shop = $("#shop" + (i+1)).val();
      const expiresIn = $("#expiresIn" + (i+1)).val(); 
      const categoryId = parseInt($("#categoryId" + (i+1)).val(), 10);
      const productId = parseInt($("#productId"+(i+1)).val(), 10);

      if($("#name" + (i+1)).val() == ''){isNull = true;}
      if($("#sell" + (i+1)).val() == ''){isNull = true;}
      if($("#quantity" + (i+1)).val() == ''){isNull = true;}
    
      purchase.products.push({
        name,
        sell,
        shop,
        quantity,
        expiresIn,
        categoryId,
        productId,
      });
    }
    
    if(isNull == false){
        const id = $("#idPurchase").val();
        updatePurchase(purchase, id);
        counter = 0;
        $("#editModal").modal("hide");
    }
    swal("Mensagem", "Preencha todos os campos!", "error");
    isNull = false;
    
  });
  

// Update the purchase
function updatePurchase(purchaseData, id) {
    var requestOptions = {
        method: 'PUT', // Use PUT for updating data
        headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
            // Add any other headers if needed
        },
        body: JSON.stringify(purchaseData) // Convert data to JSON string
    };

    // Perform the fetch request
    fetch(`${baseUrl}/purchases/${id}`, requestOptions)
        .then(response => response.json())
        .then(data => {
                swal("Mensagem", "Produto registado com sucesso!", "success");
                loadAll();
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors here
        });
}

  //Set data to datatable
  fetch(baseUrl+'/sales')
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
              data: data,
              columns: [
                { data: 'id' },
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
    fetch(baseUrl+'/sales')
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
              data: data,
              columns: [
                { data: 'id' },
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
