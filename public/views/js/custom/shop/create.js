// Global product var
const baseUrl = window.env.BASE_URL || 'http://localhost:3000';
var products = [];
var counter = 1;
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
})

// Add new purchase
$("#registerBtn").click(function(e){
e.preventDefault();
var isOk = true;
var barcode = $("#barcode").val().trim() === '' ? generateBarcode(): $("#barcode").val().trim();
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
if(invoice.val().trim() === ''){
    validate(invoice, "O número da factura é obrigatória");
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

            const generatecode = $("#flexSwitchCheckChecked").prop("checked");

            products.forEach(product => {
                product["invoice"] = parseInt(invoice.val(), 10);
              });
              
              const total = (getTotalPurchase() + (parseInt(quantity.val(), 10) * shop.val()));
              
            var newPurchase = {
                "name": name.val(),
                "barcode": $("#barcode").val() == '' ? generateBarcode(): parseInt($("#barcode").val().trim(), 10),
                "sell": sell.val(),
                "shop": shop.val(),
                "quantity": parseInt(quantity.val(), 10),
                "expiresIn": expiresIn.val(),
                "invoice": parseInt(invoice.val(), 10),
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
                    // Add any other headers if needed
                },
                body: JSON.stringify(products) // Convert data to JSON string
            };
            // Perform the fetch request
            fetch(baseUrl+'/purchases', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if(!data.error){
                        swal("Mensagem", "Produto registado com sucesso!", "success");
                    }
                    else
                    {
                        swal("Mensagem", "Operação falhou, contacte a equipe técnica!", "error");
                    }
                    
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Handle errors here
                });

 }

})



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