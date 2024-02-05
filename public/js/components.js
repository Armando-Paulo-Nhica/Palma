
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
                class="icon icon-payment"></i><span class="nav-text">Aquisição de produtos</span></a>
        <ul aria-expanded="false">
            <li><a href="/product/create"><i class="mdi mdi-circle-outline"></i> Registar entrada</a></li>
            <li><a href="/product/view"><i class="mdi mdi-circle-outline"></i> Visualizar</a></li>
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Relatório</a></li>
        </ul>
    </li>
    ${isAdmin() ? `<li class="nav-label first">Controle de Stock</li>
    <li><a class="has-arrow" href="javascript:void()" aria-expanded="false"><i
        class="icon icon-cart-simple"></i><span class="nav-text">Stock</span></a>
        <ul aria-expanded="false">
            <li><a href="/stock/create"><i class="mdi mdi-circle-outline"></i> Registar novo</a></li>
            <li><a href="/stock/view"><i class="mdi mdi-circle-outline"></i> Visualizar</a></li>
        </ul>
    </li>` : ``}
    
    <li class="nav-label first">Gestão de serviços</li>
    <li><a class="has-arrow" href="javascript:void()" aria-expanded="false"><i
        class="icon icon-layers-3"></i><span class="nav-text">Serviços</span></a>
        <ul aria-expanded="false">
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Criar Serviço</a></li>
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Ver Serviços</a></li>
        </ul>
    </li>

    <li class="nav-label first">Documentos</li>
    <li><a class="has-arrow" href="javascript:void()" aria-expanded="false"><i
        class="icon icon-layers-3"></i><span class="nav-text">Facturação</span></a>
        <ul aria-expanded="false">
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Criar nova factura</a></li>
            
        </ul>
    </li>

    ${isAdmin() ? ` <li class="nav-label first">Gestão financeira</li>
    <li><a class="has-arrow" href="javascript:void()" aria-expanded="false"><i
        class="icon icon-payment"></i><span class="nav-text">Finanças</span></a>
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
        class="icon icon-users-mm"></i><span class="nav-text">Recursos humanos</span></a>
        <ul aria-expanded="false">
            <li><a href="/user"><i class="mdi mdi-circle-outline"></i> Funcionários</a></li>
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Folha de Pagamento</a></li>
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Gestão de Ponto</a></li>

        </ul>
    </li>` : ``}

    

    </li>
</ul>
</div>`;

document.getElementById("footer-info").innerHTML = `
<p>By <a href="#" target="_blank"> <i style="font-weight: bold">Web Soluções Gráfica</i> | </a> info@websolucoesgrafica.co.mz | 2024</p>
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
                        <input class="form-control" type="search" placeholder="Search" aria-label="Search">
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
            <li class="nav-item dropdown header-profile">
                <a class="nav-link" href="#" role="button" data-toggle="dropdown">
                    <i class="mdi mdi-account"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right">
                    <a href="./app-profile.html" class="dropdown-item">
                        <i class="icon-user"></i>
                        <span class="ml-2">Perfil</span>
                    </a>
                    <a href="./page-login.html" class="dropdown-item">
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
</div>`;

$("#logout").click(function(e){
    e.preventDefault();
    localStorage.clear();
    window.location.href = '/user/login';

})