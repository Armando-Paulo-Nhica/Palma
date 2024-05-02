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
                                <link rel="stylesheet" href="index.css">
                                <style>
                                    @import url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
                            
                            *:not(i,span){
                                font-family: "Poppins", sans-serif;
                            }
                            
                            *{
                                padding: 0px;
                                margin: 0px;
                                box-sizing: border-box;
                            }
                            
                            :root{
                                --larguraRecibo: 250px;
                                --corItems: #555;
                                --pequenosTitulos: #666;
                            }
                            
                            .recibo{
                                width: var(--larguraRecibo);
                                min-height: 400px;
                                border: 1px solid #222;
                                position: relative;
                                
                            }
                            
                            .conteinerRecibo{
                                width: 100%;
                                height: 100vh;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            }
                            
                            .logo{
                                position: absolute;
                                left: 0;
                                top: 0;
                                width: 100%;
                                height: 100%;
                                background-position: center;
                                background-size: 50%;
                                background-repeat: no-repeat;
                                /* filter: invert(10); */
                                filter: saturate(0);
                                opacity: 15%;
                            }
                            
                            .conteudoRecibo{
                                /* position: absolute;
                                left: 0;
                                top: 0; */
                                width: calc(100% - 0px);
                                height: calc(100% - 0px);
                                padding: 10px 20px;
                                border: 0px solid black;
                            
                            }
                            
                            .conteudoRecibo h1{
                                text-align: center;
                                text-transform: uppercase;
                                font-size: 1.1rem;
                                color: #222;
                                font-weight: 500;
                            }
                            
                            ul{
                                list-style: none;
                            }
                            
                            .contElemento{
                                margin-top: 5px;
                                border-bottom: 2px dotted var(--corItems);
                                padding-bottom: 10px;
                            }
                            
                            .contElemento li{
                                text-align: center;
                                color: var(--corItems);
                                font-size: 13px;
                                text-transform: capitalize;
                            }
                            
                            .contElemento:first-child li{
                                font-size: 12px;
                            }
                            
                            .cabecalhoTabela{
                                margin-top: 5px;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                            }
                            
                            .nomeCabe{
                                font-size: 13px;
                                text-transform: uppercase;
                                color: var(--pequenosTitulos);
                                font-weight: 500;
                            }
                            
                            .osItemsProdu li{
                                display: flex;
                                justify-content: space-between;
                                font-size: 13px;
                                color: var(--corItems);
                            }
                            .nomeCabeL{
                                width: 35%;
                                overflow: hidden;
                                border: 0px solid black;
                                font-size: 12px;
                            }
                            
                            .nomeCabeL2{
                                display: flex;
                                justify-content: flex-end;
                            }
                            
                            .indice{
                                text-align: center;
                            }
                            
                            .osItemsProdu{
                                border-bottom: 2px dotted var(--corItems);
                                padding-bottom: 10px;
                            }
                            /* 
                            .osItemsProdu:nth-child(2){
                                border-bottom: 2px dotted #888;
                            } */
                            
                            .rodapeContact{
                                border-top: 0px solid #ccc;
                                margin-top: 10px;
                            }
                            .iteRodape{
                                display: flex;
                                font-size: 13px;
                                color: var(--corItems);
                                text-transform: capitalize;
                                width: 100%;
                                flex-wrap: wrap;
                            }
                            
                            .iteRodape span{
                                margin-right: 5px;
                                font-size: 13px;
                            }
                            
                            .assinatura{
                                border-top: 2px dotted var(--corItems);
                                text-align: center;
                                font-size: 13px;
                                color: var(--corItems);
                                margin-top: 15px;
                                padding-top: 7px;
                            }
                            
                            .logotipoCliente{
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                margin-top: 10px;
                            }
                            
                            .logj{
                                width: 100%; 
                                height: 50px;
                                border: 0px solid black;
                                background-position: bottom center;
                                background-size: 25%;
                                background-repeat: no-repeat;
                                /* filter: invert(10); */
                                /* filter: saturate(0); */
                                opacity: 90%;
                                margin-bottom: 12px;
                            }
                            
                            .logj img{
                                width: 100%;
                            }
                                </style>
                            </head>
                            <body>
                                <div class="conteinerRecibo">
                                    <div class="recibo">
                                        <div class="logo" style="background-image: url(./logo/logo3.png);">
                                        </div>
                                        <div class="conteudoRecibo">
                                            <div class="logotipoCliente">
                                                <div class="logj" style="background-image: url(../../public/images/logo3.png);">
                                                </div>
                                            </div>
                                            <h1>
                                                palma
                                            </h1>
                                            <div class="contElemento">
                                                <ul>
                                                    <li>
                                                        palma - web solunuucoes
                                                    </li>
                                                    <li>
                                                        Sofala - beira
                                                    </li>
                                                </ul>
                                            </div>
                                            <!-- <div class="contElemento">
                                                <ul>
                                                    <li>
                                                        Tel. 84 444 4444
                                                    </li>
                                                    <li>
                                                        Nuit. 999999999
                                                    </li>
                                                </ul>
                                            </div> -->
                                            <div class="tabelaPreco">
                                                <div class="cabecalhoTabela">
                                                    <div class="nomeCabe">
                                                        Item
                                                    </div>
                                                    <div class="nomeCabe">
                                                        Valor
                                                    </div>
                                                </div>
                                                <div class="osItemsProdu">
                                                    <ul>
                                                        <li>
                                                            <div class="nomeCabeL">
                                                                Bannana.
                                                            </div>
                                                            <div class="indice">
                                                                -----
                                                            </div>
                                                            <div class="nomeCabeL nomeCabeL2">
                                                                200,00MT
                                                            </div>
                                                        </li>
                            
                                                        <li>
                                                            <div class="nomeCabeL">
                                                                Baana.
                                                            </div>
                                                            <div class="indice">
                                                                -----
                                                            </div>
                                                            <div class="nomeCabeL nomeCabeL2">
                                                                200,00MT
                                                            </div>
                                                        </li>
                            
                                                        <li>
                                                            <div class="nomeCabeL">
                                                                Manga.
                                                            </div>
                                                            <div class="indice">
                                                                -----
                                                            </div>
                                                            <div class="nomeCabeL nomeCabeL2">
                                                                300,00MT
                                                            </div>
                                                        </li>
                            
                                                        <li>
                                                            <div class="nomeCabeL">
                                                                Camisa.
                                                            </div>
                                                            <div class="indice">
                                                                -----
                                                            </div>
                                                            <div class="nomeCabeL nomeCabeL2">
                                                                2000,00MT
                                                            </div>
                                                        </li>
                            
                                                        <li>
                                                            <div class="nomeCabeL">
                                                                Camisola.
                                                            </div>
                                                            <div class="indice">
                                                                -----
                                                            </div>
                                                            <div class="nomeCabeL nomeCabeL2">
                                                                15000,00MT
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="tabelaPreco">
                                                <div class="cabecalhoTabela">
                                                    <div class="nomeCabe">
                                                        Taxa
                                                    </div>
                                                    <div class="nomeCabe">
                                                        Valor
                                                    </div>
                                                </div>
                                                <div class="osItemsProdu">
                                                    <ul>
                                                        <li>
                                                            <div class="nomeCabeL">
                                                                Total
                                                            </div>
                                                            <div class="indice">
                                                                -----
                                                            </div>
                                                            <div class="nomeCabeL nomeCabeL2">
                                                                1800,00MT
                                                            </div>
                                                        </li>
                            
                                                        <li>
                                                            <div class="nomeCabeL">
                                                                IVA(16%).
                                                            </div>
                                                            <div class="indice">
                                                                -----
                                                            </div>
                                                            <div class="nomeCabeL nomeCabeL2">
                                                                200,00MT
                                                            </div>
                                                        </li>
                                                        
                            
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="rodapeContact">
                                                <div class="iteRodape">
                                                    <span>
                                                        Telefone.
                                                    </span>
                                                    <span>
                                                        (+258) 84 444 4444
                                                    </span>
                                                </div>
                                                <div class="iteRodape">
                                                    <span>
                                                        Av. samora machel
                                                    </span>
                                                    <span>
                                                        Rua Krus Gomes
                                                    </span>
                                                </div>
                                                
                                                <div class="iteRodape">
                                                    <span>
                                                        nuit.
                                                    </span>
                                                    <span>
                                                        9999999
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="assinatura">
                                                Processado por palma
                                            </div>
                                        </div>
                                        
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