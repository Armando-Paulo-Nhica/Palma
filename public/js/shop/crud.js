const token = localStorage.getItem('token');
const baseUrl = 'http://localhost:3000/api';

$(document).ready(function() {

  var rowId = 0;
  var counter = 0;
  var counterEdit = 0;
  var dataTable;
  var categories = [];
  var suppliers = [];
  var isNull = false;
  //Catch the id
  $('#shop').on('click', '[data-rowid]', function(event) {
      event.preventDefault();
      rowId = $(this).data('rowid');
      setPurchaseValues();
      viewPaurchaseProducts();
  });

  //Delete the purchase
  $("#deleteBtn").click(function(){
   
        fetch(baseUrl+'/purchases/' + rowId, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
      })
          .then(response => response.json())
          .then(data => {
              loadAll();
          })
          .catch(error => {
              // Handle error if needed
              console.error('Error deleting purchase:', error);
          });
      
  })

// Setting values to modal
function setPurchaseValues() {
    
    var requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };


    fetch(`${baseUrl}/purchases/${rowId}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            const productsContainer = $("#editPurch");
            productsContainer.empty(); // Clear existing content
            var productHtml = `
                        <div class="form-group mt-4 input-group col-md-12 col-xxl-12 col-xl-12">
                            <select id="supplier" class="form-control" required>
                                ${suppliers.map(item => `<option value="${item.id}" ${item.id == data.supplier.id ? 'selected' : ''}>${item.name}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group col-md-12 col-xxl-12 col-xl-12">
                            <label>Número de factura</label>
                            <input type="number" id="invoice" value="${data.invoice}" class="form-control" >
                        </div>
                        <input type="hidden" id="idPurchase" value="${data.id}">
                    `;
                productsContainer.append(productHtml);
                counterEdit = data.purchases.length;
            for(let i = 0; i< data.purchases.length; i++){
                productHtml = `<div class="row mx-2 mb-3" style="box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;">
                        <div class="form-group col-md-12 col-xxl-12 col-xl-12">
                            <label>Nome do produto</label>
                            <input type="text" id="name`+ (i + 1) +`" value="${data.purchases[i].name}" class="form-control" >
                        </div>
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6">
                            <label>Valor de compra</label>
                            <input type="number" min="1" id="shop`+(i + 1)+`" value="${data.purchases[i].shop}" class="form-control" >
                        </div>
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6">
                            <label>Valor de venda</label>
                            <input type="number" min="1" id="sell`+(i + 1)+`" value="${data.purchases[i].sell}" class="form-control" >
                        </div>
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6">
                            <label>Quantidade   </label>
                            <input type="number" min="1" id="quantity`+(i + 1)+`" value="${data.purchases[i].quantity}" class="form-control" >
                        </div>
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6">
                            <label>Data validade   </label>
                            <input type="date" id="expiresIn`+(i + 1)+`" value="${data.purchases[i].product.expiresIn}" class="form-control" >
                        </div>
                    
                    <div class="form-group col-md-6 mt-4 input-group col-md-12 col-xxl-12 col-xl-12">
                            <div class="input-group-prepend bg-primary" data-toggle="modal" data-target="#addCategory">
                                <div class="input-group-text bg-btn bt">+</div>
                            </div>
                            
                            <select name="categories" id="categoryId${i + 1}" class="form-control categories">
                                ${categories.map(item => `<option value="${item.id}" ${item.id === data.purchases[i].product.categoryId ? 'selected' : ''}>${item.name}</option>`).join('')}
                            </select>

                    </div>
                    <input type="hidden" id="productId`+(i + 1)+`" value="${data.purchases[i].productId}">
                </div>
                `;
                productsContainer.append(productHtml);
                
            };

            // Add more code to set values for other elements if needed

        })
        .catch(error => console.error('Error fetching data:', error));


      
}


// View purchase products
// Setting values to modal
function viewPaurchaseProducts() {
    var requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };


    fetch(`${baseUrl}/purchases/${rowId}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            const productsContainer = $("#viewProducts");
            productsContainer.empty(); // Clear existing content
            var productHtml = `
                        <div class="form-group mt-4 input-group col-md-12 col-xxl-12 col-xl-12">
                            <select class="form-control" disabled>
                                ${suppliers.map(item => `<option value="${item.id}" ${item.id == data.supplier.id ? 'selected' : ''}>${item.name}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group col-md-12 col-xxl-12 col-xl-12">
                            <label>Número de factura</label>
                            <input type="number" value="${data.invoice}" class="form-control" readonly>
                        </div>
                        
                    `;
                productsContainer.append(productHtml);
                counter = data.purchases.length;
            for(let i = 0; i< data.purchases.length; i++){
                productHtml = `<div class="row mx-2 mb-3" style="box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;">
                        <div class="form-group col-md-12 col-xxl-12 col-xl-12">
                            <label>Nome do produto</label>
                            <input type="text" value="${data.purchases[i].name}" class="form-control" readonly>
                        </div>
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6">
                            <label>Valor de compra</label>
                            <input type="number" value="${data.purchases[i].shop}" class="form-control" readonly>
                        </div>
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6">
                            <label>Valor de venda</label>
                            <input type="number" value="${data.purchases[i].sell}" class="form-control" readonly>
                        </div>
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6">
                            <label>Quantidade   </label>
                            <input type="number" value="${data.purchases[i].quantity}" class="form-control" readonly>
                        </div>
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6">
                            <label>Data validade   </label>
                            <input type="text"  class="form-control" value="${data.purchases[i].product.expiresIn}" readonly>
                        </div>
                    
                    <div class="form-group col-md-6 mt-4 input-group col-md-12 col-xxl-12 col-xl-12">
                            <div class="input-group-prepend bg-primary" data-toggle="modal" data-target="#addCategory">
                                <div class="input-group-text bg-btn bt">+</div>
                            </div>
                            
                            <select name="categories" id="categoryId${counter + 1}" class="form-control categories" disabled>
                                ${categories.map(item => `<option value="${item.id}" ${item.id === data.purchases[i].product.categoryId ? 'selected' : ''}>${item.name}</option>`).join('')}
                            </select>

                    </div>
                    
                </div>
                `;
                productsContainer.append(productHtml);
                
            };

            // Add more code to set values for other elements if needed

        })
        .catch(error => console.error('Error fetching data:', error));


      
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
$("#edit-purchase-btn").click(function() {
    var purchase = {
      invoice: parseInt($("#invoice").val(), 10),
      totalShop: 0,
      supplierId: parseInt($("#supplier").val(), 10),
      products: []
    };

    var qty = 0;
    var price = 0;
    
    for (var i = 0; i < counterEdit; i++) {
        qty = parseInt($("#quantity" + (i+1)).val(), 10);
        price = parseFloat($("#shop" + (i+1)).val()).toFixed(2)

        purchase.totalShop += qty*price;

      if($("#name" + (i+1)).val() == ''){isNull = true;}
      if($("#sell" + (i+1)).val() == ''){isNull = true;}
      if($("#quantity" + (i+1)).val() == ''){isNull = true;}
    
      purchase.products.push({
        name : $("#name" + (i+1)).val(),
        sell : $("#sell" + (i+1)).val(),
        shop : $("#shop" + (i+1)).val(),
        quantity : parseInt($("#quantity" + (i+1)).val(), 10),
        expiresIn : $("#expiresIn" + (i+1)).val(),
        categoryId : parseInt($("#categoryId" + (i+1)).val(), 10),
        productId : parseInt($("#productId"+(i+1)).val(), 10),
      });

    }

    counterEdit = 0;
    counter = 0;
    

    if(isNull == false){
        const id = $("#idPurchase").val();
        updatePurchase(purchase, id);
        purchase = {
            invoice: 0,
            totalShop: 0,
            supplierId: 0,
            products: []
        };
        $("#editModal").modal("hide");
    }
    else{
        swal("Mensagem", "Preencha todos os campos!", "error");
        isNull = false;
    }
   
  });
  
// Update the purchase
function updatePurchase(purchaseData, id) {
    var requestOptions = {
        method: 'PUT', // Use PUT for updating data
        headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(purchaseData) // Convert data to JSON string
    };

    // Perform the fetch request
    fetch(`${baseUrl}/purchases/${id}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            swal("Mensagem", "Alterações feitas com sucesso!", "success");
                setTimeout(function() {
                    swal.close();
                }, 2000);
                loadAll();
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors here
        });
}


var requestPurchase = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
};

  //Set data to datatable
  fetch(baseUrl+'/purchases', requestPurchase)
      .then(response => response.json())
      .then(data => {
         if (dataTable) {
            dataTable.destroy();
          }
          
          dataTable = $('#shop').DataTable({
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
                { data: 'invoice' },
                { data: 'totalShop' },
                { data: 'supplier.name' },
                {
                    data: 'supplier.contact',
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
    fetch(baseUrl+'/purchases',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
      .then(response => response.json())
      .then(data => {
         // Destroy the existing DataTable instance before reinitializing
         if (dataTable) {
            dataTable.destroy();
          }
          dataTable = $('#shop').DataTable({
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
                  { data: 'invoice' },
                  { data: 'totalShop' },
                  { data: 'supplier.name' },
                  {
                    data: 'supplier.contact',
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
