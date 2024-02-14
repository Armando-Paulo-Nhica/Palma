

var dadosArea = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
    datasets: [{
        label: 'Vendas',
        data: [50, 30, 40, 70, 45],
        borderColor: '#dc2626',
        backgroundColor: 'rgba(220, 38, 38, 0.2)',
        fill: true,
        tension: 0.4 // Defina o tension para tornar as linhas curvas
    }, {
        label: 'Receita',
        data: [100, 230, 160, 120, 400],
        borderColor: '#1cbc88',
        backgroundColor: 'rgba(28, 188, 136, 0.2)',
        fill: true,
        tension: 0.4 // Defina o tension para tornar as linhas curvas
    }]
};

var configArea = {
    type: 'line',
    data: dadosArea
};

var graficoArea = new Chart(document.getElementById('area'), configArea);



// Grafico circular
const ctx = document.getElementById('myChart').getContext('2d');
    const labels = ['Produto A', 'Produto B', 'Produto C'];
    const data = [500, 300, 200];
    const backgroundColors = [
      'rgba(28, 188, 136, 0.5)', // Cor para vendas mais altas
      'rgba(54, 162, 235, 0.6)', // Cor para vendas médias
      'rgba(255, 206, 86, 0.6)'  // Cor para vendas mais baixas
    ];
    const borderColors = ['transparent', 'transparent', 'transparent'];

    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
