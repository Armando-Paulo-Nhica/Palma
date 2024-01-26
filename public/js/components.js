
// Sidebar

document.getElementById("quixnav").innerHTML = `<div class="quixnav-scroll">
<ul class="metismenu" id="menu">
    <li class="nav-label first">Gestão de vendas</li>
    <li><a class="has-arrow" href="javascript:void()" aria-expanded="false"><i
                class="icon icon-payment"></i><span class="nav-text">Vendas</span></a>
        <ul aria-expanded="false">
            <li><a href="/sale/create"><i class="mdi mdi-circle-outline"></i> Registar nova</a></li>
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Visualizar histórico</a></li>
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

    <li class="nav-label first">Controle de Stock</li>
    <li><a class="has-arrow" href="javascript:void()" aria-expanded="false"><i
        class="icon icon-cart-simple"></i><span class="nav-text">Stock</span></a>
        <ul aria-expanded="false">
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Registar novo</a></li>
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Visualizar</a></li>
        </ul>
    </li>

    <li class="nav-label first">Gestão de serviços</li>
    <li><a class="has-arrow" href="javascript:void()" aria-expanded="false"><i
        class="icon icon-layers-3"></i><span class="nav-text">Serviços</span></a>
        <ul aria-expanded="false">
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Criar Serviço</a></li>
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Ver Serviços</a></li>
        </ul>
    </li>

    <li class="nav-label first">Gestão financeira</li>
    <li><a class="has-arrow" href="javascript:void()" aria-expanded="false"><i
        class="icon icon-payment"></i><span class="nav-text">Finanças</span></a>
        <ul aria-expanded="false">
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Contas a pagar</a></li>
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Fluxo de caixa</a></li>
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Balanço Patrimonial</a></li>
        </ul>
    </li>

    <li class="nav-label first">Análise de relatórios</li>
    <li><a class="has-arrow" href="javascript:void()" aria-expanded="false"><i
        class="icon icon-analytics"></i><span class="nav-text">Relatório</span></a>
        <ul aria-expanded="false">
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Relatórios Personalizados</a></li>
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Análises de Desempenho</a></li>
        </ul>
    </li>


    <li class="nav-label first">Administração do Staff</li>
    <li><a class="has-arrow" href="javascript:void()" aria-expanded="false"><i
        class="icon icon-users-mm"></i><span class="nav-text">Recursos humanos</span></a>
        <ul aria-expanded="false">
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Cadastro de Funcionários</a></li>
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Folha de Pagamento</a></li>
            <li><a href="#"><i class="mdi mdi-circle-outline"></i> Gestão de Ponto</a></li>

        </ul>
    </li>

    </li>
</ul>
</div>`;

document.getElementById("footer-info").innerHTML = `
<p>By <a href="#" target="_blank">Web Soluções Gráfica | </a> info@websolucoesgrafica.co.mz | 2024</p>
`;
