// Retrieve the token from localStorage

// Create new sale
$("#saveCompany").click(function(e){
  e.preventDefault()
 var name = $("#nameE");
 var street = $("#streetE");
 var zone = $("#zoneE");
 var nuit = $("#nuitE");
 var contact = $("#contactE");
 var city = $("#cityE");
 var isOk = true;

    if(name.val().trim() == ''){
      isOk = false;
      validate(name, 'O campo nome é obrigatório')
    }

    if(street.val().trim() == ''){
      isOk = false;
      validate(street, 'O campo rua é obrigatório')
    }

    if(zone.val().trim() == ''){
      isOk = false;
      validate(zone, 'O campo bairro é obrigatório')
    }

    if(nuit.val().trim() == ''){
      isOk = false;
      validate(nuit, 'O campo nuit é obrigatório')
    }

    if(contact.val().trim() == ''){
      isOk = false;
      validate(contact, 'O campo contacto é obrigatório')
    }

    if(city.val() == null){
      isOk = false;
      validate(city, 'O campo cidade é obrigatório')
    }

    if(isOk){
        var company = {
          name: name.val(),
          zone: zone.val(),
          street: street.val(),
          nuit : parseInt(nuit.val(), 10),
          city: city.val(),
          contact : contact.val()
        }
        
        updateCompany(company);
        company = {}
    }

})


// Update the user
function updateCompany(company){
  const token = localStorage.getItem('token');
  const baseUrl = 'http://localhost:3000/api';
  var requestOptions = {
      method: 'PUT',  
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(company)
  };
  // Perform the fetch request
  fetch(baseUrl+'/companies/1', requestOptions)
      .then(response => response.json())
      .then(data => {
          if(!data.error){
              $("#createCompanyModal").modal("hide")
              swal("Mensagem", data.msg, "success");
              getCompany()
              setTimeout(function () {
                  swal.close();
              }, 2000);
            
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
          
      });
}


function getCompany(){
  const token = localStorage.getItem('token');
  const baseUrl = 'http://localhost:3000/api';

  var reqToken = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Include the Authorization header with the token
        'Authorization': `Bearer ${token}`,
        // Add any other headers if needed
      },
    };
  
    //Set data to datatable
    fetch(baseUrl+'/companies/1', reqToken)
        .then(response => response.json())
        .then(data => {
          $(".nameC").text(data.name)
          $(".cityC").text(data.city)
          $(".nuitC").text(data.nuit)
          $(".zoneC").text(data.zone)
          $(".streetC").text(data.street)
          $(".contactC").text(data.contact)

          $("#nameE").val(data.name)
          $("#cityE").val(data.city)
          $("#nuitE").val(data.nuit)
          $("#zoneE").val(data.zone)
          $("#streetE").val(data.street)
          $("#contactE").val(data.contact)
        })
        .catch(error => console.error('Error fetching data:', error));

        // countMySales();
        // countTodaySales();
}




function validate(name, message){
  name.next('.error-message').remove();
  name.after('<span class="error-message">' + message + '</span>');

}
