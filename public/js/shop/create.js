// Global product var
const token = localStorage.getItem('token');
const baseUrl = 'http://localhost:3000/api';
var products = [];
var counter = 1;
var generatecode = false;
// add new product
$("#addPurchase").click(function(){
    // Create a new object for each purchase
    var isOk = true;
    counter++;
    if(counter == 2){
        $(".counter").append(`<span><i class="fas fa-cart-plus"></i></span>`);
    }

    //Validation
    if($("#name1").val().trim() === ''){
        validate($("#name1"), "O nome do produto é obrigatório");
        isOk = false;
    }
    if($("#sell1").val().trim() === ''){
        validate($("#sell1"), "O valor de venda é obrigatório");
        isOk = false;
    }
    if($("#shop1").val().trim() === ''){
        validate($("#shop1"), "O valor de compra é obrigatório");
        isOk = false;
    }
    if($("#quantity1").val().trim() === ''){
        validate($("#quantity1"), "A quantidade é obrigatória");
        isOk = false;
    }
    if($("#categoryName1").val() === null && $("#catName").length < 1){
        $("#categoryName1").next('.supplier-msg').remove();
        $("#categoryName1").after('<span class="supplier-msg">Selecione a categoria ou crie nova</span>');
        isOk = false;
    }
    
    
    $("#totalIn").text(counter)
    $("#barcode1").focus()
     var newPurchase = {
        "name": $("#name1").val(),
        "barcode": $("#barcode1").val().trim() === '' ? generateBarcode(): $("#barcode1").val().trim(),
        "sell": $("#sell1").val(),
        "shop": $("#shop1").val(),
        "quantity": parseInt($("#quantity1").val(), 10),
        "expiresIn": $("#expiresIn1").val(),
        "invoice": parseInt($("#invoice1").val(), 10),
        "categoryName":$("#categoryName1").val() == null ? $("#catName").val().trim() : $("#categoryName1").val(),
        "supplierName": $("#suppliers").val() == null ? $("#supplierName").val().trim() : $("#suppliers").val(),
        "contact": $("#contact").val().trim(),
        "email":$("#email").val().trim()
    };
    
    // Add the new object to the products array
    products.push(newPurchase);

    $("#addProduct").modal("hide");
})

// Add new purchase
$("#registerBtn").click(function(e){
e.preventDefault();
var isOk = true;
var name = $("#name");
var sell = $("#sell");
var shop = $("#shop");
var invoice = $("#invoice");
var quantity = $("#quantity");
var expiresIn = $("#expiresIn");
var supplierName = $("#suppliers");
var supplierName1 = $("#supplierName");
var categoryName = $("#categories");
var categoryName1 = $("#categoryName");

if(name.val().trim() === ''){
    validate(name, "O nome do produto é obrigatório");
    isOk = false;
}

if(sell.val().trim() === ''){
    validate(sell, "O valor da venda é obrigatório");
    isOk = false;
}
if(shop.val().trim() === ''){
    validate(shop, "O valor da compra é obrigatório");
    isOk = false;
}
if(quantity.val().trim() === ''){
    validate(quantity, "A quantidade é obrigatória");
    isOk = false;
} 
if(supplierName.val() == null && supplierName1.val().trim() === ''){
    supplierName.next('.supplier-msg').remove();
    supplierName.after('<span class="supplier-msg">Selecione o fornecedor ou crie novo</span>');
    isOk = false;
 }
 if(categoryName.val() == null && categoryName1.val().trim() === ''){
    categoryName.next('.supplier-msg').remove();
    categoryName.after('<span class="supplier-msg">Selecione a categoria ou crie nova</span>');
    isOk = false;
 }

if(isOk){
            counter = 0;
            $("#totalIn").text("")
            $(".counter span").remove();

            generatecode = $("#flexSwitchCheckChecked").prop("checked");
            // Add field to all objects
            products.forEach(product => {
                product["invoice"] = invoice.val() == '' ? 0 : parseInt(invoice.val(), 10);
                product["totalShop"] = (getTotalPurchase() + (parseInt(quantity.val(), 10) * shop.val()));
              });
              
              const total = (getTotalPurchase() + (parseInt(quantity.val(), 10) * shop.val()));
              
            var newPurchase = {
                "name": name.val(),
                "barcode": $("#barcode").val() == '' ? generateBarcode(): parseInt($("#barcode").val().trim(), 10),
                "sell": sell.val(),
                "shop": shop.val(),
                "quantity": parseInt(quantity.val(), 10),
                "expiresIn": expiresIn.val(),
                "invoice": invoice.val() == '' ? 0 : parseInt(invoice.val(), 10),
                "totalShop": total, 
                "categoryName":categoryName.val() == null ? categoryName1.val().trim() : categoryName.val(),
                "supplierName": supplierName.val() == null ? supplierName1.val().trim() : supplierName.val(),
                "contact": $("#contact").val().trim(),
                "email":$("#email").val().trim()
                
            };
            
            // Add the new object to the products array
            products.push(newPurchase);
            
            //======= CREATE NEW PURCHASE ========
            var requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(products) // Convert data to JSON string
            };
            // Perform the fetch request
            fetch(baseUrl+'/purchases', requestOptions)
                .then(response => response.json())
                .then(data => {
                    
                    if(!data.error){
                        $("#name").val("");
                        $("#sell").val("");
                        $("#shop").val("");
                        $("#invoice").val("");
                        $("#quantity").val("");
                        products = [];
                        sale = [];
                        
                        if(generatecode){
                            printBarcode(data.paths);
                        }
                        else{
                            
                            swal("Mensagem", "Produto registado com sucesso!", "success");
                            setTimeout(function () {
                                swal.close();
                                // window.location.href = '/product/view';
                            }, 500);
                        }
                        
                    }
                    else
                    {
                        swal("Mensagem", "Operação falhou, contacte a equipe técnica!", "error");
                    }
                    
                })
                .catch(error => {
                    
                });

 }

})



function printBarcode(printData) {
    window.jsPDF = window.jspdf.jsPDF;
console.log(printData)
      const pdf = new jsPDF();

      printData.paths.forEach((base64img, index) => {
        // Add an image to the PDF
        pdf.addImage(base64img.barcode, 'png', 10, 10 + index * 40, 50, 30);
        pdf.text(base64img.name+""+base64img.price+"MT", 12, 8+ index*40)
      });

      // Get the data URI of the PDF
      const pdfDataUri = pdf.output('datauristring');

      // Open a new popup window
      const popupWindow = window.open('', '_blank', 'width=800,height=600');

      // Set the content of the popup window
      popupWindow.document.write('<html><head><title>PDF Viewer</title></head><body>');
      popupWindow.document.write('<object data="' + pdfDataUri + '" type="application/pdf" width="100%" height="100%">');
      popupWindow.document.write('<p>It appears you don\'t have a PDF plugin for this browser. You can <a href="' + pdfDataUri + '">download the PDF file.</a></p>');
      popupWindow.document.write('</object>');
      
      popupWindow.document.write('</body></html>');

      // Prevent the popup window from navigating to a blank page
      popupWindow.document.close();
    
  }


// Calculate the total of purchase

function getTotalPurchase() {
    var total = 0;
    for (let i = 0; i < products.length; i++) {
        total += (products[i].quantity * products[i].shop);
    }
    return parseFloat(total);
}



$(".form-control").on("input", function(){
        $(this).next('.error-message').remove();
})

//Input Validation

function validate(name, message){
        name.next('.error-message').remove();
        name.after('<span class="error-message">' + message + '</span>');
   
}
//Generate barcode
function generateBarcode() {
    // Get the current time as a string with 4 digits
    var timestamp = new Date().getTime().toString().slice(-6);

    // Generate 2 random digits
    var randomDigits = Math.floor(Math.random() * 900000) + 100000;

    // Combine the time and random digits to create the 10-digit barcode
    var barcode = timestamp + randomDigits;

    return parseInt(barcode, 10);
}  


// Add new input for category name

$("#addCategoryModal").click(function(){
    $(this).parent().after(`<div class="form-group col-md-12">
    <label>Nome da categoria <i style="color: red;">*</i></label>
    <input type="text" id="catName" class="form-control" placeholder="Digite o nome..">
</div>`)
})

// Load categories
function populateSelectCat(data) {
    const selectElement = $('#categories');
    const selectElementModal = $('#categoryName1');
    data.forEach(item => {
        selectElement.append($('<option>', {
            value: item.name,
            text: item.name
        }));
        selectElementModal.append($('<option>', {
            value: item.name,
            text: item.name
        }));
    });
}
//Fetch data
fetch(baseUrl+'/categories')
.then(response => response.json()) 
.then(data => {
    populateSelectCat(data);
    
})
.catch(error => {
    console.error('Error fetching data:', error);
});


//load suppliers
function populateSelect(data) {
    const selectElement = $('#suppliers');
    
    
    
    data.forEach(item => {
        selectElement.append($('<option>', {
            value: item.name,
            text: item.name
        }));
        
    });
}
//Fetch data
fetch(baseUrl+'/suppliers')
.then(response => response.json()) 
.then(data => {
    populateSelect(data);
    
})
.catch(error => {
    console.error('Error fetching data:', error);
});




