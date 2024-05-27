// Retrieve the token from localStorage
const token = localStorage.getItem('token');
const baseUrl = localStorage.getItem('API_URL');


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
              // $("#with-icon_collapseTwo").collapse("toggle");
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
  const customer = $("#customerId").val() == null ? ($("#customerName").val() == '' ? '--------' : $("#customerName").val()) : $("#customerId").val()
 generatePDF(transformJson(), customer)

})

// Generate the output
function transformJson() {
  
  const outputJson = {
    totalAmount: 0,
    items: []
  };

  sale.forEach(item => {
    const name = item.name;
    const quantity = item.quantity;
    const subTotal = parseFloat(item.subtotal);
    const price = parseFloat(item.sell);

    // Update totalAmount
    outputJson.totalAmount += subTotal;

    // Add item to the items array
    outputJson.items.push({
      price,
      name,
      quantity,
      subTotal
    });
  });

  sale = [];
  $("#counter-id").text("");
  counter = 0;
  $('#dta').empty();
  setAmount();
  
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
            value: item.fullname,
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

// var company = {key: "test"}

// Get company
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
async function generatePDF(data, customer) {
        
        var company = await getCompany().then(companyData => {
          return companyData;
      })

      
      const todayDate = getFormattedDate();

  const htmlContent = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../../css/custom/invoice.css">
</head>
<body class="container-factura">

    <div class="fatura">
        <div class="corpoFacture">
            <header class="cabecalho">
                <div class="logo">
                    <h2>${company.name}</h2> 
                </div>
                <ul>
                    <li>
                        <div class="dataEmissao">
                            <span>
                                Data
                            </span>
                            <div class="diaMesAno">
                               ${todayDate}   
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="numFatura">
                            <div class="fat">
                                <span>
                                    Factura
                                </span>
                                <span>
                                    6438798
                                </span>
                            </div>
                            <div class="paiz">
                                Mozambique
                            </div>
                        </div>
                    </li>
                </ul>
            </header>
            
            <div class="assignFactura">
                <div class="companyT">
                    <h2>
                        Endereço
                    </h2>
                    <ul>
                    <li>
                            <span>
                                Cidade: 
                            </span>
                            <span>
                            ${company.city}
                            </span>
                    </li>    
                    <li>
                            <span>
                                Nuit: 
                            </span>
                            <span>
                            ${company.nuit}
                            </span>
                        </li>
                        <li>
                            <span>
                                Endereço:
                            </span>
                            <span>
                            ${company.city}
                            </span>
                        </li>
                        <li>
                            <span>
                                Rua:
                            </span>
                            <span>
                            ${company.street}
                            </span>
                        </li>
                        <li>
                            <span>
                                Bairro:
                            </span>
                            <span>
                            ${company.zone}
                            </span>
                        </li>
                        <li>
                        <span>
                            Contacto:
                        </span>
                        <span>
                        ${company.contact}
                        </span>
                    </li>
                       
                    </ul>
                </div>

                <div class="companyT">
                    <h2>
                        Cliente
                    </h2>
                    <ul>
                        <li>
                            <span>
                                Nome:
                            </span>
                            <span>
                                ${customer}
                            </span>
                        </li>
                        <li>
                            <span>
                                Mozambique
                            </span>
                        </li>
                        <li>
                            <span>
                                Sofala
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            <table>
                <thead>
                    <th>
                        #
                    </th>
                    <th>
                        Produto
                    </th>
                    <th>
                        Preço
                    </th>
                    <th>
                        Qty.
                    </th>
                    <th>
                        Subtotal
                    </th>
                </thead>
           
                ` +
                data.items.map((item, index) => `
                  <tr> 
                    <td>${index + 1}.</td>
                    <td>${item.name}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${item.quantity}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                `).join('\n') +
                `
            </table>
            <div class="tot">
                <div class="total">
                    <span>
                        Total
                    </span>
                    <span>
                    MZN ${(data.totalAmount).toFixed(2)}
                    </span>
                </div>
            </div>
            
        </div>
        
    </div>
</body>
</html>
  `;

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
}
