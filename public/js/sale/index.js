// Retrieve the token from localStorage
const token = localStorage.getItem('token');
const baseUrl = 'http://localhost:3000/api';


  async function findProduct(barcode) {
    var requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Include the Authorization header with the token
        'Authorization': `Bearer ${token}`,
        // Add any other headers if needed
      },
    };

    return fetch(baseUrl+`/products/barcode/${barcode}`, requestOptions)
      .then(response => {
        if (response.status === 200) {
          // HTTP status code is 200 (OK)
          return response.json();
        } else if (response.status === 404) {
          // Product not found
          return { error: true, msg: 'Produto não foi encontrado!' };
        } else {
          // Handle other HTTP status codes
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .then(data => {
        if (data.error) {
          
          return null; // or handle accordingly
        }
        
        return data;
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
        throw error; // You might want to handle or log the error appropriately
      });
  }

// Find product by name
async function findProductByName(name){
  var requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Include the Authorization header with the token
      'Authorization': `Bearer ${token}`,
      // Add any other headers if needed
    },
  };
    return fetch(baseUrl+`/products/name/${name}`, requestOptions)
    .then(response => {
      if (response.status === 200) {
        // HTTP status code is 200 (OK)
        return response.json();
      } else if (response.status === 404) {
        // Product not found
        return { error: true, msg: 'Produto não foi encontrado!' };
      } else {
        // Handle other HTTP status codes
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    })
    .then(data => {
      if (data.error) {
        
        return null; // or handle accordingly
      }
      
      return data;
    })
    .catch(error => {
      console.error('Error fetching product data:', error);
      throw error; // You might want to handle or log the error appropriately
    });
}

  var counter = 0;
  var sale = [];

  $("#search-box").on("change", function(){
    var barcode = $(this).val();
    var exists = false;
    var index = 0;

    findProduct(barcode)
    .then(data => {
      if (data != null) {
              $(this).val("");
              $("#with-icon_collapseTwo").collapse("show");

              $(this).attr("placeholder", barcode);
              // Check if the product already exists
              for (var i = 0; i < sale.length; i++) {
                if (barcode == sale[i].barcode) {
                    exists = true;
                    index = i;
                }
              }
              if(exists === false){
                counter++;
                $("#counter-id").text(counter);
                displayDataInTable(data);
              }
              else
              {
                  if(sale[index].maxQty < sale[index].quantity + 1){
                      swal("Mensagem", "Quantidade insuficiente no Stock!", "error");
                      setTimeout(function () {
                          swal.close();
                      }, 2000);

                      $(this).focus()
                
                  }
                  else
                  {
                    sale[index].quantity += 1;
                    sale[index].subtotal = (sale[index].sell * sale[index].quantity).toFixed(2);
                      // Clear the rows
                    $("#dta").empty();
                    displaySales(sale);
                  }

              }
      } else {
        swal("Mensagem!", "Nenhum produto foi encontrado!", "error");
      }
    })
    .catch(error => {
      // console.error('Error:', error);
    });
  
  })

// Search by product name
$("#searchProductBtn").on("click", function(){
  var name = $("#search-box").val();
  var exists = false;
  var index = 0;

  findProductByName(name)
  .then(data => {
    if (data != null) {
      $("#search-box").val("");
      $("#with-icon_collapseTwo").collapse("show");
            // Check if the product already exists
            for (var i = 0; i < sale.length; i++) {
              if (name == sale[i].name) {
                  exists = true;
                  index = i;
              }
            }
            if(exists === false){
              counter++;
              $("#counter-id").text(counter);
              displayDataInTable(data);
            }
            else
            {
              
              sale[index].quantity += 1;
              sale[index].subtotal = (sale[index].sell * sale[index].quantity).toFixed(2);
                // Clear the rows
              $("#dta").empty();
              displaySales(sale);
      
            }
    } else {
      swal("Mensagem!", "Nenhum produto foi encontrado!", "error");
    }
  })
  .catch(error => {
    // console.error('Error:', error);
  });

})

// Display many
function displaySales(product) {
  
 for(var i=0; i<product.length; i++){
    var row = "<tr>";
    row += "<th>" + product[i].counter + "</th>";
    row += "<td>" + product[i].name + "</td>";
    row += "<td><input type='text' class='price' value=" + product[i].sell + " readonly></td>";
    row += "<td><input type='text' class='qty' value='" + product[i].quantity + "'/></td>";
    row += "<td><input type='text' class='discount' value='0'/></td>";
    row += "<td><input type='text' value="+(product[i].sell * product[i].quantity).toFixed(2)+" readonly class='subtotal'></td>";
    row += "<td class='actions'> <i class='fas fa-plus gute' onClick='addQty(this)'></i> <i class='fas fa-minus gute' onClick='reduceQty(this)'></i> <i class='fas fa-trash gute' onClick='deleteRow(this)'></i></td>";
    row += "</tr>";

    $("#dta").append(row);
 }
  $("#data-table").show();
  
  setAmount();
}

  function displayDataInTable(product) {
    // counter++;
    var row = "<tr>";
    row += "<th>" + counter + "</th>";
    row += "<td class='name'>" + product.name + "</td>";
    row += "<td><input type='text' class='price' value=" + product.sell + " readonly></td>";
    row += "<td><input type='text' class='qty' value='1'/></td>";
    row += "<td><input type='text' class='discount' value='0'/></td>";
    row += "<td><input type='text' value="+product.sell+" readonly class='subtotal'></td>";
    row += "<td class='actions'> <i class='fas fa-plus gute' onClick='addQty(this)'></i> <i class='fas fa-minus gute' onClick='reduceQty(this)'></i> <i class='fas fa-trash gute' onClick='deleteRow(this)'></i></td>";
    row += "</tr>";

    $("#dta").append(row);
    $("#data-table").show();

    var newPurchase = {
      "counter": counter,
      "productId": product.id,
      "barcode": product.barcode,
      "quantity": 1,
      "name": product.name,
      "sell": product.sell,
      "shop": product.shop,
      "price": product.price,
      "discount": 0,
      "subtotal": product.sell,
      "maxQty": product.quantity
    };
  sale.push(newPurchase);
  setAmount();

  }

  function searchProductByBarcode(barcodeToSearch) {
    for (var i = 0; i < products.length; i++) {
      if (products[i].barcode === barcodeToSearch) {
        return products[i];
      }
    }
    return null;
  }
  
// JavaScript function to increase quantity
function addQty(elem) {

  // Find the parent row
  var row = $(elem).closest("tr");
  // Find the input element within the row

  var quantityInput = row.find("td input.qty");
  var name = row.find("td.name").text();
  
  var subtotal = row.find("td input.subtotal");
  var price = row.find("td input.price");
  var discount = parseFloat(row.find("td input.discount").val(), 10);
  var currentQuantity = parseInt(quantityInput.val(), 10);

  var newQuantity = (currentQuantity + 1) > 0 ? currentQuantity + 1 : 1;
  
      // Update sale array
      var index = row.find("th").text();
      if(sale[index-1].name == name){

            if(sale[index -1].maxQty < newQuantity){
              swal("Mensagem", "Quantidade insuficiente no Stock!", "error");
              setTimeout(function () {
                  swal.close();
              }, 2000);
            }
            else{
                  quantityInput.val(newQuantity);
                  var sbtotal = parseFloat(price.val(), 10).toFixed(2) * parseInt(newQuantity, 10);
                  subtotal.val(parseFloat((sbtotal - sbtotal*(discount/100)).toFixed(2)))
                  sale[index -1].quantity = newQuantity;
                  sale[index -1].subtotal = subtotal.val();
                  setAmount();
            }
      }
    

}




// update sales price
function setAmount() {
  var totalWithDiscount = 0;
  var discount = 0;
  var total = 0;

  for (var i = 0; i < sale.length; i++) {
    totalWithDiscount += parseFloat(sale[i].subtotal);
    
    if (sale[i].discount > 0) {
      discount += parseFloat(sale[i].quantity * sale[i].sell - sale[i].subtotal);
    }
    
    total += parseFloat(sale[i].quantity * sale[i].sell);
  }

  // Setting the values with proper formatting
  $("#s-subtotal").html(total.toFixed(2) + ' MT');
  $("#s-discount").html(discount.toFixed(2) + ' MT');
  $("#s-total").html(totalWithDiscount.toFixed(2) + ' MT');
}
 // JavaScript function to reduce quantity
function reduceQty(elem) {
  var row = $(elem).closest("tr");
  var quantityInput = row.find("td input.qty");
  var subtotal = row.find("td input.subtotal");
  var price = row.find("td input.price");
  var discount = parseFloat(row.find("td input.discount").val(), 10);
  var currentQuantity = parseInt(quantityInput.val(), 10);
  var newQuantity = (currentQuantity - 1) > 0 ? (currentQuantity - 1) : 1;
  newQuantity = isNaN(newQuantity) ? 1 : newQuantity;
  quantityInput.val(newQuantity);
  var sbtotal = parseFloat(price.val(), 10).toFixed(2) * parseInt(newQuantity, 10);
  subtotal.val(parseFloat((sbtotal - sbtotal*(discount/100)).toFixed(2)))

  var index = row.find("th").text();
  sale[index-1].subtotal = subtotal.val();
  sale[index-1].quantity = newQuantity;
  setAmount();

}
// input quantity
$('#table').on('input', '.qty', function() {
  var row = $(this).closest("tr");
  var subtotal = row.find("td input.subtotal");
  var price = row.find("td input.price");
  var discount = parseFloat(row.find("td input.discount").val(), 10);
  var qty = row.find("td input.qty").val() > 0 ? row.find("td input.qty").val() : 1;
  qty = isNaN(qty) ? 1 : qty;
  var index = row.find("th").text();
  var name = row.find("td.name").text();

  if(sale[index -1].maxQty < qty){

    if(sale[index-1].name == name){
      swal("Mensagem", "Quantidade insuficiente no Stock!", "error");
      setTimeout(function () {
          swal.close();
      }, 2000);
    }

  }
  else
  {
    var sbtotal = parseFloat(price.val(), 10).toFixed(2) * parseInt(qty, 10);
    subtotal.val(parseFloat((sbtotal - sbtotal*(discount/100).toFixed(2)).toFixed(2)))
    
    sale[index-1].subtotal = subtotal.val();
    sale[index-1].quantity = qty;
    setAmount();
  }
  
});

// discount
$('#table').on('input', '.discount', function() {
  var row = $(this).closest("tr");
  var subtotal = row.find("td input.subtotal");
  var discount = ($(this).val() < 0 || $(this).val() > 100) ? 0 : parseFloat($(this).val()).toFixed(2);
  discount = isNaN(discount) ? 0 : discount;
  var sbtotal = parseFloat(row.find("td input.price").val(), 10).toFixed(2) * parseInt(row.find("td input.qty").val(), 10);
  var total = parseFloat((sbtotal - sbtotal*(discount/100).toFixed(2)).toFixed(2)) > 0 ? parseFloat((sbtotal - sbtotal*(discount/100).toFixed(2)).toFixed(2)) : 0;
  subtotal.val(total)
  var index = row.find("th").text();
  sale[index-1].discount = discount;
  sale[index-1].subtotal = subtotal.val();
  setAmount();
});

$('#table').on('focus', '.qty', function() {$(this).select();});
$('#table').on('focus', '.discount', function() {$(this).select();});

// Delete row
function deleteRow(elem) {
  var row = $(elem).closest("tr");
  var index = row.find("th").text();
  sale.splice(index, 1);
  
    $(elem).closest("tr").remove();
    counter--;
    $("#counter-id").text(counter);
  
  
}


// Create new sale
$("#saleBtn").click(function(){
  const status = $("#icon2").hasClass("fa-solid fa-circle-check") ? true : false;

    // Create new sale
    var requestOptions = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
          'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(transformJson()) // Convert data to JSON string
  };
  // Perform the fetch request
  fetch(baseUrl+'/sales', requestOptions)
      .then(response => response.json())
      .then( async data => {
          if(!data.error){
              if(!status){
                    swal("Mensagem", "Venda registada com sucesso!", "success");
                            setTimeout(function () {
                                swal.close();
                            }, 1500);
                  $("#counter-id").text("");
                  counter = 0;
                  sale = [];
                  $('#dta').empty();
                  setAmount();
              }
              else{
                
                generatePDF();

                $("#counter-id").text("");
                  counter = 0;
                  sale = [];
                  $('#dta').empty();
                  setAmount();
              }
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
          console.error('Error:', error);
          // Handle errors here
      });
})



// Generate the output
function transformJson() {
  
  const outputJson = {
    totalAmount: 0,
    customerId: parseInt($("#customerId").val(), 10),
    employerId: getEmployerId(),
    items: []
  };

  sale.forEach(item => {
    const productId = parseInt(item.productId, 10);
    const quantity = item.quantity;
    const subTotal = parseFloat(item.subtotal);

    // Update totalAmount
    outputJson.totalAmount += subTotal;

    // Add item to the items array
    outputJson.items.push({
      productId,
      quantity,
      subTotal
    });
  });

  
  return outputJson;
}


//Fetch data
fetch(baseUrl+'/customers')
.then(response => response.json()) 
.then(data => {
    getCustomers(data);
})
.catch(error => {
    console.error('Error fetching data:', error);
});

//load suppliers
function getCustomers(data) {
    const selectElement = $('#customerId');
    
    data.forEach(item => {
        selectElement.append($('<option>', {
            value: item.id,
            text: item.fullname
        }));
        
    });
}

function getEmployerId(){
    const [header, payload, signature] = token.split('.');
    const decodedPayload = atob(payload);
    const payloadData = JSON.parse(decodedPayload);

    return parseInt(payloadData.user.id, 10);
}


// Print receipt

async function getCompany() {
  try {
      const reqToken = {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              // Include the Authorization header with the token
              'Authorization': `Bearer ${token}`,
              // Add any other headers if needed
          },
      };

      // Fetch company data
      const response = await fetch(baseUrl + '/companies/1', reqToken);
      if (!response.ok) {
          throw new Error('Failed to fetch company data');
      }

      // Parse response body as JSON and return
      return await response.json();
  } catch (error) {
      console.error('Error fetching company data:', error);
      throw error; // Rethrow the error to the caller
  }
}

function getFormattedDate() {
  // Create a new Date object for today's date
  const currentDate = new Date();

  // Define options for formatting the date
  const options = { 
      month: 'long', // Full month name (e.g., January)
      day: 'numeric', // Day of the month (e.g., 26)
      year: 'numeric' // Full year (e.g., 2023)
  };

  // Format the date according to the options
  const formattedDate = currentDate.toLocaleDateString('pt-PT', options);

  // Return the formatted date
  return formattedDate;
}


// Print invoice

async function generatePDF() {
  const text = await `${sale.map((item) => {
    return `
        <div class="items">
            <span>${item.name}</span>
            <span class="details">
                <span>${item.quantity}x</span>
                <span>${item.sell}</span>
                <span>${item.subtotal}</span>
            </span>
        </div>`;
}).join('')}`;


  try {
      // Fetch company data
      const company = await getCompany().then((data)=>{
       
        
        // Get today's date
        var todayDate = new Date().toLocaleDateString();

        
        // Generate HTML content for receipt
        const htmlContent = `
                      <!DOCTYPE html>
                      <html lang="en">
                      <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        
                        <style>
                          body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                          }
                      
                          .receipt {
                            max-width: 250px;
                            margin: 20px auto;
                            padding: 10px;
                          }
                      
                          .topinfo{
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            background: gray;
                            margin-bottom: 10px;
                            width: 100%
                          }
                          .logo {
                            display: flex;
                            justify-content: center;
                            flex-direction: column;
                            align-items: center;
                          }

                          .logo span{
                            margin-bottom: 3px;
                          }
                          
                          .footer{
                            display: flex;
                            align-items: center;
                            flex-direction: column;
                          }

                          .footer i{
                            font-size: 15px;
                          }

                          .footer span{
                            font-size: 13px;
                          }
                          .logo img {
                            max-width: 100%;
                            height: auto;
                            margin-bottom: 10px;
                          }

                          .logo span:first-of-type{
                            font-size: 28px;
                            font-weight: bold;
                          }
                      
                          .divider {
                            border-top: 1px solid rgba(0, 0, 0, 0.1);
                            box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
                            margin: 10px 0;
                          }
                          
                          .header {
                            font-size: 18px;
                            font-weight: bold;
                            margin-bottom: 10px;
                          }
                      
                          .company-info {
                            margin-top: 15px 0;
                            font-size: 14px;
                          }
                      
                          .company-info div, .info div{
                            margin-bottom: 10px;
                          }
                          .info {
                            margin-top: 10px;
                            font-size: 14px;
                          }
                      
                          .bd-line {
                            border-bottom: 1px dotted #c0c0c0;
                          }

                          .items{
                            border-bottom: 1px dotted #c0c0c0;
                          }

                          .topBar{
                            box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
                            margin: 15px 0;
                          }

                          h3{
                            border-bottom: 2px solid #e4e0e0;
                          }
                        
                          .item {
                            margin-top: 10px;
                            font-size: 14px;
                          }
                      
                          .item div{
                            margin-bottom: 13px;
                            font-size: 12px;
                            /* font: 14px Roboto, Sans-serif;
                            color: #c0c0c0; */
                            
                          }
                      
                          .total {
                            margin-top: 5px;
                            font-size: 16px;
                            font-weight: 300;
                            display: flex;
                            justify-content: space-between;
                          }
                        

                          @media print {
                            @page {
                                margin: 0;
                            }
                            body {
                                margin: 0;
                            }
                            header,
                            footer {
                                display: none !important;
                            }
                        }

                        .items{
                          display: flex;
                          flex-direction: column;
                          font-size: 13px;
                        }

                        .items .details{
                          display: flex;
                          justify-content: space-between;
                        }
                        </style>
                      </head>
                      <body>
                      
                        <div class="receipt" id="receipt">
                          <div class="topinfo">
                            <div class="logo">
                                <img width="70" src="
                                
                                data:image/png;base64,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AAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQmzgMAAAAAAABAYuI8AAAAAAAAACQm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AAAAgMyE8wAAAAAAAACQmXAeAAAAAAAAADITzgMAAAAAAABAZsJ5AAAAAAAAAMhMOA8AAAAAAAAAmQnnAQAAAAAAACAz4TwAAAAAAAAAZCacBwAAAAAAAIDMhPMAAAAAAAAAkJlwHgAAAAAAAAAyE84DAAAAAAAAQGbCeQAAAAAAAADITDgPAAAAAAAAAJkJ5wEAAAAAAAAgM+E8AAAAAAAAAGQmnAcAAAAAAACAzITzAAAAAAAAAJCZcB4AAAAAAAAAMhPOAwAAAAAAAEBmwnkAAAAAAAAAyEw4DwAAAAAAAACZCecBAAAAAAAAIDPhPAAAAAAAAABkJpwHAAAAAAAAgMyE8wAAAAAAAACQmXAeAAAAAAAAADITzgMAAAAAAABAZsJ5AAAAAAAAAMhMOA8AAAAAAAAAmQnnAQAAAAAAACAz4TwAAAAAAAAAZCacBwAAAAAAAIDMhPMAAAAAAAAAkJlwHgAAAAAAAAAyE84DAAAAAAAAQGbCeQAAAAAAAADITDgPAAAAAAAAAJkJ5wEAAAAAAAAgM+E8AAAAAAAAAGQmnAcAAAAAAACAzITzAAAAAAAAAJCZcB4AAAAAAAAAMhPOAwAAAAAAAEBmwnkAAAAAAAAAyEw4DwAAAAAAAACZCecBAAAAAAAAIDPhPAAAAAAAAABkJpwHAAAAAAAAgMyE8wAAAAAAAACQmXAeAAAAAAAAADITzgMAAAAAAABAZsJ5AAAAAAAAAMhMOA8AAAAAAAAAmQnnAQAAAAAAACAz4TwAAAAAAAAAZCacBwAAAAAAAIDMhPMAAAAAAAAAkJlwHgAAAAAAAAAyE84DAAAAAAAAQGbCeQAAAAAAAADITDgPAAAAAAAAAJkJ5wEAAAAAAAAgM+E8AAAAAAAAAGQmnAcAAAAAAACAzITzAAAAAAAAAJCZcB4AAAAAAAAAMhPOAwAAAAAAAEBmwnkAAAAAAAAAyEw4DwAAAAAAAACZCecBAAAAAAAAIDPhPAAAAAAAAABkJpwHAAAAAAAAgMyE8wAAAAAAAACQmXAeAAAAAAAAADITzgMAAAAAAABAZsJ5AAAAAAAAAMhMOA8AAAAAAAAAmQnnAQAAAAAAACAz4TwAAAAAAAAAZCacBwAAAAAAAIDMhPMAAAAAAAAAkJlwHgAAAAAAAAAyE84DAAAAAAAAQGbCeQAAAAAAAADI7HZ4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" alt="Logo image"/>
                                <span>${data.name}</span>
                                <span>${data.city} - ${data.zone}</span>
                                <span>Recibo No: 876345</span>
                                <span> (+258) ${data.contact}</span>
                                <div class="topbar"></div><br>
                            </div>
                          </div>
                          <h3>Produtos</h3>
                          <div class="item">
                          ${text}
                 
                    </div>
                    
                    <h3>Taxas</h3>
                    <div class="items">
                    <span>IVA</span>
                    <span class="details">
                      <span>16%</span>
                      <span>580</span>
                      <span>MZN 20</span>
                    </span>
                </div>
                  <div class="topbar"></div>
                          <div class="total">
                          <span>${todayDate}</span>
                          <span>Total: MZN 250.00</span>
                          </div>
                            
                          <div class="footer">
                          <i>*****Processado por <strong>Palma</strong>*****</i>
                            <span>********* Volte sempre! *********</span>

                          </div>
                        </div>
                      
                      </body>
                      </html>
        
                  `;
                  
                  // Create a hidden iframe to load the HTML content for printing
                  var iframe = document.createElement('iframe');
                  iframe.style.display = 'none';
                  document.body.appendChild(iframe);
                  var iframeDoc = iframe.contentWindow.document;
                  iframeDoc.open();
                  iframeDoc.write(htmlContent);
                  iframeDoc.close();
                  
                  // Wait for iframe to finish loading content
                  iframe.onload = function() {
                    // Print the content
                    iframe.contentWindow.print();
                  };

                });

                } catch (error) {
                  console.error('Error generating PDF:', error);
                }
                
                
}





 function sumAmount(){
    var total = 0;
    sale.map((item) => {
        total += parseFloat(item.subtotal);
    });
    return parseFloat(total).toFixed(2); 
}


async function getCompany() {
  try {
      const reqToken = {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              // Include the Authorization header with the token
              'Authorization': `Bearer ${token}`,
              // Add any other headers if needed
          },
      };

      // Fetch company data
      const response = await fetch(baseUrl + '/companies/1', reqToken);
      if (!response.ok) {
          throw new Error('Failed to fetch company data');
      }

      // Parse response body as JSON and return
      return await response.json();
  } catch (error) {
      console.error('Error fetching company data:', error);
      throw error; // Rethrow the error to the caller
  }
}


function getFormattedDate() {
  // Create a new Date object for today's date
  const currentDate = new Date();

  // Define options for formatting the date
  const options = { 
      month: 'long', // Full month name (e.g., January)
      day: 'numeric', // Day of the month (e.g., 26)
      year: 'numeric' // Full year (e.g., 2023)
  };

  // Format the date according to the options
  const formattedDate = currentDate.toLocaleDateString('pt-PT', options);

  // Return the formatted date
  return formattedDate;
}