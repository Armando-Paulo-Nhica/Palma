
const baseUrl = 'http://localhost:3000/api';


// Load categories
function populateSelectCat(data) {
    const selectElement = $('#category');
    
    data.forEach(item => {
        selectElement.append($('<option>', {
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


$("#registerBtn").click(function(e){
    var isOk = true;

    if($("#name").val() === ''){
        validate($("#name"), "O nome do produto é obrigatório");
        isOk = false;
    }
    if($("#sell").val().trim() === ''){
        validate($("#sell"), "O valor de venda é obrigatório");
        isOk = false;
    }
    
    if($("#quantity").val() === ''){
        validate($("#quantity"), "A quantidade é obrigatória");
        isOk = false;
    }
    if($("#category").val() === null && $("#categoryName").val() === ''){
        $("#category").before('<span class="supplier-msg">Selecione a categoria ou crie nova</span>');
        isOk = false;
    }

   if(isOk){
        var products = {
            name: $("#name").val(),
            barcode: $("#barcode").val() === '' ? generateBarcode() : parseInt($("#barcode").val(), 10),
            sell: $("#sell").val(),
            shop: 0,
            quantity: parseInt($("#quantity").val(), 10),
            expiresIn: $("#expiresIn").val(),
            categoryName: $("#category").val() == null ? $("#categoryName").val() : $("#category").val(),
            }

        createProduct(products);
   }
   

    e.preventDefault();
})


// Create product
function createProduct(data){
     // Create new sale
     var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
            // Add any other headers if needed
        },
        body: JSON.stringify(data) // Convert data to JSON string
    };
    // Perform the fetch request
    fetch(baseUrl+'/products', requestOptions)
        .then(response => response.json())
        .then(data => {
            if(!data.error){
                swal("Mensagem", "Novo produto foi registado com sucesso!", "success");
                        setTimeout(function () {
                            window.location.href = '/stock/view';
                        }, 500);
            }
            else
            {
                swal({
                    title: "Mensagem",
                    text: "Operação falhou, contacte a equipe técnica!",
                    icon: "error",
                    timer: 2500,  // Set the time delay in milliseconds
                    buttons: false  // Disable the "OK" button
                  });
            }
            
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors here
        });
}


$(".form-control").on("input", function(){
    $(this).next('.error-message').remove();
})

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

//Input Validation

function validate(name, message){
    name.next('.error-message').remove();
    name.after('<span class="error-message">' + message + '</span>');

}