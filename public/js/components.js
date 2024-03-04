
function checkToken() {
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    // Check if token exists
    if (!token) {
        window.location.href = '/user/login';
        return; // Exit function early
    }

    try {
        // Decode the token to extract payload
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = payload.exp * 1000; 

        // Get current time
        const currentTime = Date.now();

        // Check if token has expired
        if (currentTime > expirationTime) {
            // Redirect to login page if token has expired
            window.location.href = '/user/login';
            return; // Exit function early
        }
    } catch (error) {
        window.location.href = '/user/login';
    }
}

// Call the checkToken function when the page loads
document.addEventListener('DOMContentLoaded', checkToken);

function isAdmin(){
    const token = localStorage.getItem('token');
    const [header, payload, signature] = token.split('.');
    const decodedPayload = atob(payload);
    const payloadData = JSON.parse(decodedPayload);
// console.log(payloadData.user.isAdmin)
    return payloadData.user.isAdmin;
}

// Sidebar
document.getElementById("quixnav").innerHTML = `<div class="quixnav-scroll">
<ul class="metismenu" id="menu">
    <li class="nav-label first">Gestão de vendas</li>
    <li><a class="has-arrow" href="javascript:void()" aria-expanded="false"><i
                class="icon icon-payment"></i><span class="nav-text">Vendas</span></a>
        <ul aria-expanded="false">
            <li><a href="/sale/create"><i class="mdi mdi-circle-outline"></i> Registar nova</a></li>
            <li><a href="/sale/view"><i class="mdi mdi-circle-outline"></i> Visualizar</a></li>
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Relatório</a></li>
        </ul>
    </li>

    <li class="nav-label first">Abastecimento do Stock</li>
    <li><a class="has-arrow" href="javascript:void()" aria-expanded="false"><i
                class="fas fa-cart-plus"></i><span class="nav-text">Aquisição de produtos</span></a>
        <ul aria-expanded="false">
            <li><a href="/product/create"><i class="mdi mdi-circle-outline"></i> Registar entrada</a></li>
            <li><a href="/product/view"><i class="mdi mdi-circle-outline"></i> Visualizar</a></li>
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Relatório</a></li>
        </ul>
    </li>
    ${isAdmin() ? `<li class="nav-label first">Controle de Stock</li>
    <li><a class="has-arrow" href="javascript:void()" aria-expanded="false"><i
        class="fas fa-boxes"></i><span class="nav-text">Stock</span></a>
        <ul aria-expanded="false">
            <li><a href="/stock/create"><i class="mdi mdi-circle-outline"></i> Registar novo</a></li>
            <li><a href="/stock/view"><i class="mdi mdi-circle-outline"></i> Visualizar</a></li>
        </ul>
    </li>` : ``}
    
    <li class="nav-label first">Gestão de serviços</li>
    <li><a class="has-arrow" href="javascript:void()" aria-expanded="false"><i
        class="fas fa-tools"></i><span class="nav-text">Serviços</span></a>
        <ul aria-expanded="false">
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Criar Serviço</a></li>
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Ver Serviços</a></li>
        </ul>
    </li>

    <li class="nav-label first">Documentos</li>
    <li><a class="has-arrow" href="javascript:void()" aria-expanded="false"><i
        class="fas fa-file-lines"></i><span class="nav-text">Faturação</span></a>
        <ul aria-expanded="false">
            <li><a href="/invoice/create"><i class="mdi mdi-circle-outline"></i> Criar nova factura</a></li>
            
        </ul>
    </li>

    ${isAdmin() ? ` <li class="nav-label first">Gestão financeira</li>
    <li><a class="has-arrow" href="javascript:void()" aria-expanded="false"><i
        class="fas fa-chart-line"></i><span class="nav-text">Finanças</span></a>
        <ul aria-expanded="false">
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Contas a pagar</a></li>
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Fluxo de caixa</a></li>
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Balanço Patrimonial</a></li>
        </ul>
    </li>` : ``}

    ${isAdmin() ? `<li class="nav-label first">Análise de relatórios</li>
    <li><a class="has-arrow" href="javascript:void()" aria-expanded="false"><i
        class="icon icon-analytics"></i><span class="nav-text">Relatório</span></a>
        <ul aria-expanded="false">
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Relatórios Personalizados</a></li>
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Análises de Desempenho</a></li>
        </ul>
    </li>` : ``}

    ${isAdmin() ? `<li class="nav-label first">Administração do Staff</li>
    <li><a class="has-arrow" href="javascript:void()" aria-expanded="false"><i
        class="fas fa-users"></i><span class="nav-text">Recursos humanos</span></a>
        <ul aria-expanded="false">
            <li><a href="/user"><i class="mdi mdi-circle-outline"></i> Funcionários</a></li>
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Folha de Pagamento</a></li>
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Gestão de Ponto</a></li>

        </ul>
    </li>` : ``}

    <li class="nav-label first">Categorias</li>
    <li><a class="has-arrow" href="javascript:void()" aria-expanded="false"><i
        class="fas fa-sitemap"></i><span class="nav-text">Categoria</span></a>
        <ul aria-expanded="false">
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Criar nova</a></li>
            
        </ul>
    </li>

    <li class="nav-label first">Fornecedores</li>
    <li><a class="has-arrow" href="javascript:void()" aria-expanded="false"><i
        class="fas fa-users-line"></i><span class="nav-text">Fornecedores</span></a>
        <ul aria-expanded="false">
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Criar novo</a></li>
            
        </ul>
    </li>

    <li class="nav-label first">Clientes</li>
    <li><a class="has-arrow" href="javascript:void()" aria-expanded="false"><i
        class="fas fa-users"></i><span class="nav-text">Clientes</span></a>
        <ul aria-expanded="false">
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Criar novo</a></li>
            
        </ul>
    </li>

</ul>
</div>`;

document.getElementById("footer-info").innerHTML = `
<p>By <a href="#" target="_blank"> Web Soluções Gráfica | </a> info@websolucoesgrafica.co.mz | 2024</p>
`;

document.getElementById("_passwordModal").innerHTML =`<div class="modal fade" id="editPassModal">
<div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Definir nova senha</h5>
            <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
            </button>
        </div>
         <div class="modal-body">
             <div class="row px-3">
                <div class="form-row col-xxl-12 col-xl-12 col-md-12">
                   
                     <div class="form-group col-xxl-12 col-xl-12 col-md-12">
                        <label>Nome do utilizador</label>
                        <input type="text" placeholder="Digite aqui" class="form-control" id="_uname">
                    </div>
                    <div class="form-group col-xxl-12 col-xl-12 col-md-12">
                        <label>Nova palavra-passe</label>
                        <input type="password" class="form-control" id="newPassword">
                    </div>

                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="setNewPassword" >Salvar</button>
            
        </div>
    </div>
</div>
</div> 



<div class="modal fade" id="createCompanyModal">
<div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Registar empresa</h5>
            <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row px-3">
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>Nome da empresa <i style="color: red;">*</i></label>
                        <input type="text" id="name" class="form-control" placeholder="Nome da empresa" autofocus>
                    </div>
                    <div class="form-group col-md-6">
                        <label>NUIT <i style="color: red;">*</i></label>
                        <input type="text" id="nuit" class="form-control"  placeholder="Nuit">
                    </div>
                    
                    <div class="form-group col-md-6">
                        <label>Bairro <i style="color: red;">*</i></label>
                        <input type="text" id="zoneC" class="form-control" placeholder="Bairro" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label>Rua <i style="color: red;">*</i></label>
                        <input type="text" id="streetC" class="form-control"  placeholder="Rua">
                    </div>
                    <div class="form-group col-md-6">
                        <label>Contacto <i style="color: red;">*</i></label>
                        <input type="text" id="contact" class="form-control"  placeholder="Contacto">
                    </div>
                    <div class="form-group col-md-6">
                        <label>Cidade <i style="color: red;">*</i></label>
                        <select class="form-control" id="city">
                            <option selected disabled value="">Selecione a cidade</option>
                             <option value="Maputo">Maputo</option>
                            <option value="Nampula">Nampula</option>
                            <option value="Beira">Beira</option>
                            <option value="Chimoio">Chimoio</option>
                            <option value="Nacala">Nacala</option>
                            <option value="Quelimane">Quelimane</option>
                            <option value="Pemba">Pemba</option>
                            <option value="Maxixe">Maxixe</option>
                            <option value="Inhambane">Inhambane</option>
                            <option value="Xai-Xai">Xai-Xai</option>
                            <option value="Tete">Tete</option>
                            <option value="Lichinga">Lichinga</option>
                        </select>
                    </div>
                    
                </div>
            </div>
        </div>
        
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="createCompany">Criar empresa</button>
        </div>
    </div>
</div>
</div> 


`;


document.getElementById("header").innerHTML =` <div class="header-content">
<nav class="navbar navbar-expand">
    <div class="collapse navbar-collapse justify-content-between">
        <div class="header-left">
            <div class="search_bar dropdown">
                <span class="search_icon p-3 c-pointer" data-toggle="dropdown">
                    <i class="mdi mdi-magnify"></i>
                </span>
                <div class="dropdown-menu p-0 m-0">
                    <form>
                        <input class="form-control" type="search" placeholder="Pesquisar ..." aria-label="Search">
                    </form>
                </div>
            </div>
        </div>

        <ul class="navbar-nav header-right">
            <li class="nav-item dropdown notification_dropdown">
                <a class="nav-link" href="#" role="button" data-toggle="dropdown">
                    <i class="mdi mdi-bell"></i>
                    <div class="pulse-css"></div>
                </a>
                <div class="dropdown-menu dropdown-menu-right">
                    <ul class="list-unstyled">
                        <li class="media dropdown-item">
                            <span class="success"><i class="ti-user"></i></span>
                            <div class="media-body">
                                <a href="#">
                                    <p><strong>Martin</strong> has added a <strong>customer</strong> Successfully
                                    </p>
                                </a>
                            </div>
                            <span class="notify-time">3:20 am</span>
                        </li>
                        <li class="media dropdown-item">
                            <span class="primary"><i class="ti-shopping-cart"></i></span>
                            <div class="media-body">
                                <a href="#">
                                    <p><strong>Jennifer</strong> purchased Light Dashboard 2.0.</p>
                                </a>
                            </div>
                            <span class="notify-time">3:20 am</span>
                        </li>
                        <li class="media dropdown-item">
                            <span class="danger"><i class="ti-bookmark"></i></span>
                            <div class="media-body">
                                <a href="#">
                                    <p><strong>Robin</strong> marked a <strong>ticket</strong> as unsolved.
                                    </p>
                                </a>
                            </div>
                            <span class="notify-time">3:20 am</span>
                        </li>
                        <li class="media dropdown-item">
                            <span class="primary"><i class="ti-heart"></i></span>
                            <div class="media-body">
                                <a href="#">
                                    <p><strong>David</strong> purchased Light Dashboard 1.0.</p>
                                </a>
                            </div>
                            <span class="notify-time">3:20 am</span>
                        </li>
                        <li class="media dropdown-item">
                            <span class="success"><i class="ti-image"></i></span>
                            <div class="media-body">
                                <a href="#">
                                    <p><strong> James.</strong> has added a<strong>customer</strong> Successfully
                                    </p>
                                </a>
                            </div>
                            <span class="notify-time">3:20 am</span>
                        </li>
                    </ul>
                    <a class="all-notification" href="#">See all notifications <i
                            class="ti-arrow-right"></i></a>
                </div>
            </li>

            ${isAdmin() ? `
            <li class="nav-item dropdown header-profile">
                <a class="nav-link" href="#" role="button" data-toggle="dropdown">
                    <i class="fas fa-gear"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right">
                    <a href="/office/profile" class="dropdown-item">
                        <i class="fas fa-box"></i>
                        <span class="ml-2">Perfil empresarial</span>
                    </a>
                    <a href="#" data-toggle="modal" data-target="#createCompanyModal" class="dropdown-item">
                        <i class="fas fa-plus"></i>
                        <span class="ml-2">Registar empresa</span>
                    </a>
                    
                </div>
            </li>` : ``}

            <li class="nav-item dropdown header-profile">
            <a class="nav-link" href="#" role="button" data-toggle="dropdown">
                <i class="fas fa-user-gear"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right">
                <a href="/user/profile" class="dropdown-item">
                    <i class="icon-user"></i>
                    <span class="ml-2">Perfil</span>
                </a>
                <a href="#" data-toggle="modal" data-target="#editPassModal" class="dropdown-item">
                    <i class="icon-key"></i>
                    <span class="ml-2">Alterar senha</span>
                </a>
                <a href="#" id="logout" class="dropdown-item">
                    <span class="ml-2"><i class="fa-solid fa-right-from-bracket"></i> Sair </span>
                </a>
            </div>
        </li>

        </ul>
    </div>
</nav>
</div>

`;

// Sending data
function updateUserPassword(userData) {
    const token = localStorage.getItem('token');
const baseUrl = 'http://localhost:3000/api';

    var requestOptions = {
        method: 'POST', // Use PUT for updating data
        headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
        
    };

    // Perform the fetch request
    fetch(`${baseUrl}/users/password/new`, requestOptions)
        .then(response => response.json())
        .then(data => {
                if(!data.error){
                    swal("Mensagem", data.msg, "success");
                    setTimeout(function() {
                        swal.close();
                    }, 2000);
                    
                }
                else
                {
                    swal("Mensagem", "Credenciais inválidas", "error");
                    setTimeout(function() {
                        swal.close();
                    }, 2000);
                    
                }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors here
        });
}


$("#setNewPassword").click(function(){
    var username = $("#_uname");
    var password = $("#newPassword");
    var isOk = true;
    if(username.val().trim() === ''){
        validate(username, 'O nome do utilizador é obrigatório')
        isOk = false;
    }

    if(password.val().trim() === ''){
        validate(password, 'A senha não pode ser vazia')
        isOk = false;
    }

    if(isOk){
        $("#editPassModal").modal("hide")
        var data = {
            id: getuserId(),
            username: username.val(),
            password: password.val()
        }

        updateUserPassword(data);
    }

    
})



$("#logout").click(function(e){
    e.preventDefault();
    localStorage.clear();
    window.location.href = '/user/login';

})


function getuserId(){
    const token = localStorage.getItem('token');
    const [header, payload, signature] = token.split('.');
    const decodedPayload = atob(payload);
    const payloadData = JSON.parse(decodedPayload);
    return payloadData.user.id;
}


function validate(name, message){
    name.next('.error-message').remove();
    name.after('<span class="error-message">' + message + '</span>');
  
  }



// Create company


// Create new sale
$("#createCompany").click(function(e){
    e.preventDefault()
   var name = $("#name");
   var street = $("#streetC");
   var zone = $("#zoneC");
   var nuit = $("#nuit");
   var contact = $("#contact");
   var city = $("#city");
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
          
          createCompany(company);
          company = {}
      }
  
   
  })
  
  
  // Create company
  function createCompany(company){
    const token = localStorage.getItem('token');
    const baseUrl = 'http://localhost:3000/api';
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(company)
    };
    // Perform the fetch request
    fetch(baseUrl+'/companies', requestOptions)
        .then(response => response.json())
        .then(data => {
            if(!data.error){
                $("#createCompanyModal").modal("hide")
                swal("Mensagem", data.msg, "success");
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
  
  // Fetch data
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
  
          
          if(isAdmin()){
            countAdmins();
            countUsers();
          }
          
  }

  function countUsers(){
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
      fetch(baseUrl+'/users/count/all', reqToken)
          .then(response => response.json())
          .then(data => {
          if(!data.error){$("#countUsers").text(data.count)}
          })
          .catch(error => console.error('Error fetching data:', error));
  }

  function countAdmins(){
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
      fetch(baseUrl+'/users/count/admins', reqToken)
          .then(response => response.json())
          .then(data => {
          if(!data.error){$("#countAdmins").text(data.count)}
          })
          .catch(error => console.error('Error fetching data:', error));
  }
  

  document.addEventListener('DOMContentLoaded', getCompany);
  
  
//   Toggle
$(".togg").click(function(){
    if($(this).find('.icon').hasClass("fa-regular fa-circle")){
        $(this).find('.icon').removeClass('fa-regular fa-circle').addClass('fa-solid fa-circle-check');
    }
    else
    {
        $(this).find('.icon').removeClass('fa-solid fa-circle-check').addClass('fa-regular fa-circle');
    }
})
  
  
  