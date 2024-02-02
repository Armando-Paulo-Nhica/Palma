const token = localStorage.getItem('token');
const baseUrl = 'http://localhost:3000/api';

$(document).ready(function() {

  var rowId = 0;

  var dataTable;

  var categories = [];
  //Catch the id
  $('#stock').on('click', '[data-rowid]', function(event) {
      event.preventDefault();
      rowId = $(this).data('rowid');
      setStockValues();
      
  });

  //Delete the purchase
  $("#deleteBtn").click(function(){
        fetch(baseUrl+'/products/' + rowId, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
      })
          .then(response => response.json())
          .then(data => {
        
                swal("Mensagem", "Produto eliminado com sucesso!", "success");
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
function setStockValues() {
    
    fetch(`${baseUrl}/products/${rowId}`, 
    {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      }}
    )
        .then(response => response.json())
        .then(data => {
            const productsContainer = $("#editStock");
            
            productsContainer.empty(); // Clear existing content
            var productHtml = `
                        <div class="form-group col-md-12 col-xxl-12 col-xl-12">
                            <label>Nome</label>
                            <input type="text" id="name" value="${data.name}" class="form-control" >
                        </div>
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6">
                            <label>Código</label>
                            <input type="number" id="barcode" value="${data.barcode}" class="form-control" >
                        </div>
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6">
                            <label>Quantidade</label>
                            <input type="number" id="quantity" value="${data.quantity}" class="form-control" >
                        </div>
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6">
                            <label>Valor de compra</label>
                            <input type="number" id="shop" value="${data.shop}" class="form-control" >
                        </div>
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6">
                            <label>Valor de venda</label>
                            <input type="number" id="sell" value="${data.sell}" class="form-control" >
                        </div>
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6">
                            <label>Data de expiração</label>
                            <input type="date" id="expiresIn" class="form-control">
                        </div>
                        <div class="form-group col-md-6 col-xxl-6 col-xl-6">
                        <label>Categoria</label>
                        <select name="categories" id="categoryId" class="form-control categories">
                            ${categories.map(item => `<option value="${item.id}" ${item.name === data.category.name ? 'selected' : ''} >${item.name}</option>`).join('')}
                        </select>
                        </div>

                        

                        <input type="hidden" id="productId" value="${data.id}" class="form-control">
                    
                    `;
                productsContainer.append(productHtml);
               
               
         

        })
        .catch(error => console.error('Error fetching data:', error));

}



//   Edit purchase
$("#edit-stock-btn").click(function() {
    var stock = {
      barcode: parseInt($("#barcode").val(), 10),
      name: $("#name").val(),
      sell: parseFloat($("#sell").val()).toFixed(2),
      shop: parseFloat($("#shop").val()).toFixed(2),
      expiresIn: $("#expiresIn").val(),
      quantity: parseInt($("#quantity").val(), 10),
      categoryId: parseInt($("#categoryId").val(), 10)
    };

   
    const id = parseInt($("#productId").val(), 10);
    updateStock(stock, id);
    $("#editModal").modal("hide");

  });
 

// Update the purchase
function updateStock(saleData, id) {
    var requestOptions = {
        method: 'PUT', // Use PUT for updating data
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(saleData) // Convert data to JSON string
    };

    // Perform the fetch request
    fetch(`${baseUrl}/products/${id}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            swal({
                title: "Mensagem",
                text: "Alterações feitas com sucesso!",
                icon: "success",
                timer: 1000,  // Set the time delay in milliseconds
                buttons: false  // Disable the "OK" button
              });
                loadAll();
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors here
        });
}

  //Set data to datatable
  fetch(baseUrl+'/products', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
        'Authorization': `Bearer ${token}`,
    }
  })
      .then(response => response.json())
      .then(data => {
         if (dataTable) {
            dataTable.destroy();
          }
         
          dataTable = $('#stock').DataTable({
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
                { data: 'barcode' },
                { data: 'name' },
                { data: 'shop'},
                { data: 'sell' },
                { data: 'quantity' },
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
                    data: 'expiresIn',
                    render: function (data, type, row) {
                      // Check if expiresIn is null
                      if (data === '') {
                        return '- - - - - - - - - --';
                      }
                  
                      // Format the 'expiresIn' date as dd-MM-YY
                      const formattedDate = new Date(data).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit'
                       
                      });
                  
                      return formattedDate;
                    }
                  },
                  
                  {
                    data: null, // Placeholder for delete button
                    render: function(data, type, row) {
                        return '<div class="actions"><a href="#" data-toggle="modal" data-target="#editModal" class="edit-btn" data-rowid="' + row.id + '"><i class="fas fa-pen-to-square"></i></a>'+
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
    fetch(baseUrl+'/products', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      }})
      .then(response => response.json())
      .then(data => {
         if (dataTable) {
            dataTable.destroy();
          }
         
          dataTable = $('#stock').DataTable({
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
                { data: 'barcode' },
                { data: 'name' },
                { data: 'shop'},
                { data: 'sell' },
                { data: 'quantity' },
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
                    data: 'expiresIn',
                    render: function (data, type, row) {
                      // Check if expiresIn is null
                      if (data === '') {
                        return '- - - - - - - - - --';
                      }
                  
                      // Format the 'expiresIn' date as dd-MM-YY
                      const formattedDate = new Date(data).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit'
                       
                      });
                  
                      return formattedDate;
                    }
                  },
                  
                  {
                      data: null, // Placeholder for delete button
                      render: function(data, type, row) {
                          return '<div class="actions"><a href="#" data-toggle="modal" data-target="#editModal" class="edit-btn" data-rowid="' + row.id + '"><i class="fas fa-pen-to-square"></i></a>'+
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


  
fetch(baseUrl+'/categories')
.then(response => response.json()) 
.then(data => {
    categories = data;
})
.catch(error => {
    console.error('Error fetching data:', error);
});

});


