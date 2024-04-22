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
  await getCompany().then(company => {

const todayDate = getFormattedDate(); 

  const  htmlContent = `
          <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Receipt</title>
          <style>
            body {
              font-family: "Poppins", sans-serif !important;
              
            }

            .receipt {
              max-width: 280px;
              margin: 10% auto;
              box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
              padding: 10px;
            }


            .divider {
              border-top: 1px solid rgba(49, 47, 47, 0.1);
              margin: 10px 0;
            }
            
            .header {
              text-align: center;
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 10px;
            }

            .company-info {
              margin-top: 10px;
              margin-bottom: 25px;
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
          
            .item {
              margin-top: 10px;
              font-size: 14px;
            }

            .item div{
              margin-bottom: 13px;
              font-size: 12px;
          
              
            }

            .total {
              margin-top: 40px;
              font-size: 16px;
              font-weight: bold;
            }


            table {
              border-collapse: collapse;
              width: 100%;
          }
          th, td {
              border: none;
              text-align: left;
              padding: 8px 0;
          }
          #price {margin-top: 20px;}
          </style>
        </head>
        <body>

        <div class="receipt" id="receipt">
        <div>
          <h3>${company.name}</h3>
        </div>
        <div class="divider"></div>
        <div style="font-size: 17px;"> Recibo n. 738784734</div>

        <div class="company-info">
          <table>
            <tbody>
                <tr><td>Data: ${todayDate}</td></tr>
                <tr><td>Contacto: ${company.contact}</td></tr>
                <tr><td>Endereço: ${company.zone}</td></tr>
            </tbody>
            </table>
          
        </div>


        <div class="item">
        <table>
          <tbody>
            ${sale.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>${item.sell}</td>
              </tr>
            `).join('\n')}
          </tbody>
        </table>
        </div>
          <div id="price">Total pago: <strong class="total"> MZN ${sumAmount()}</strong></div>
        </div>
        </body>
        </html>
`

;
    // Options for PDF generation
    const options = {
    filename: 'document.pdf', // Name of the PDF file
    html2canvas: {}, // Options for html2canvas library
    jsPDF: {} // Options for jsPDF library
    };
    
    // Generate PDF from HTML content
    html2pdf().from(htmlContent).set(options).toPdf().get('pdf').then(function(pdf) {
    // Create a blob URL for the PDF
    const blobUrl = URL.createObjectURL(pdf.output('blob'));

    // Open PDF in a new window
    window.open(blobUrl, '_blank');
    });

  })
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