  var salesValues = [];
  var salesMonths = [];
  var costsMonths = [];
  var revenue = [];
  var pieValues = [];
  var pieLabels = [];
  var myPieChart;
  var interval = $("#interval").val();
  const baseUrl = localStorage.getItem('API_URL');

  $("#interval").on("change", async function(){
    myPieChart.destroy();
    pieLabels = [];
    pieValues = [];
    await top3($(this).val()).then(data =>{
      setformat(data);
    
      displaypieChart(pieLabels, pieValues)
    })
  })

  // Last five manths
  async function lastFiveMonths(){
    const token = localStorage.getItem('token');
    
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
      return await fetch(baseUrl+'/sales/get/last/five', reqToken)
          .then(response => response.json())
          .then(data => {
          if(!data.error){
            
            return data;
          }
          })
          
  }

  async function costOfLast5Months(){
    const token = localStorage.getItem('token');
    
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
       return await fetch(baseUrl+'/sales/cost/of/fivemonths/get', reqToken)
          .then(response => response.json())
          .then(data => {
              if(!data.error){
                
                return calculateTotalCost(data.costs)
              }
          })
          
  }

  
  async function top3(interval){
    const token = localStorage.getItem('token');
    
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
       return await fetch(baseUrl+'/sales/get/top3/'+interval, reqToken)
          .then(response => response.json())
          .then(data => {
              if(!data.error){
                
                return data
              }
          })
          
  }

  document.addEventListener('DOMContentLoaded',async function() {
    await costOfLast5Months().then(data =>{
      formatValues(data, lastFiveMonths());
    });

 await top3(interval).then(data =>{
  setformat(data);

  displaypieChart(pieLabels, pieValues)
  
 });



lastFiveMonths().then(data =>{
      processSalesData(data.sales);
      displayChart(salesValues, salesMonths, revenue)
    
      
    });
});

function setformat(top3Data){
 top3Data.top3.forEach(item =>{
  pieValues.push(item.total)
  pieLabels.push(item.name)
 })
}

async function formatValues(costs, saleValues) {
  // Clear existing data in global arrays
  revenue.length = 0;
  costsMonths.length = 0;
var saleData = await saleValues.then(data => {return data})

  // Push costs data to arrays
  costs.forEach(item => {
    revenue.push(item.sum);
    costsMonths.push(item.month);
  });

  for (let i = 0; i < revenue.length; i++) {
    revenue[i] = saleData.sales[i]._sum.totalAmount - revenue[i];
    
  }
}


var chartType = $("#chartType").val();
var chartType2 = $("#chartType2").val();
var graficoArea;
var graficoArea2;
var configArea = {}
var configArea2 = {}


function displayChart(data, months, revenue){
      var dadosArea = {
        labels: months,
        datasets: [{
            label: 'Vendas',
            data: data,
            borderColor: '#dc2626',
            backgroundColor: 'rgb(64, 84, 195, .9)',
            fill: true,
            tension: 0.4 // Defina o tension para tornar as linhas curvas
        }, {
            label: 'Receitas',
            data: revenue,
            borderColor: '#1cbc88',
            backgroundColor: 'rgb(55, 141, 165)',
            fill: true,
            tension: 0.4 // Defina o tension para tornar as linhas curvas
        }]
    };

    configArea = {
        type: chartType,
        data: dadosArea
    };

    configArea2 = {
      type: chartType2,
      data: dadosArea
  };

    graficoArea = new Chart(document.getElementById('area'), configArea);
    graficoArea2 = new Chart(document.getElementById('area2'), configArea2);
}

$("#chartType").on("change", function(){
  var newChartType = $(this).val();
  configArea.type = newChartType;
  graficoArea.destroy();
  graficoArea = new Chart(document.getElementById('area'), configArea);
});


$("#chartType2").on("change", function(){
  var newChartType = $(this).val();
  configArea2.type = newChartType;
  graficoArea2.destroy();
  graficoArea2 = new Chart(document.getElementById('area2'), configArea2);
});


// Grafico circular
function displaypieChart(pieLabels, pieValues){
    const ctx = document.getElementById('myChart').getContext('2d');
      const labels = pieLabels;
      const data = pieValues;
      const backgroundColors = [
        'rgba(28, 188, 136, 0.5)', // Cor para vendas mais altas
        'rgba(54, 162, 235, 0.6)', // Cor para vendas médias
        'rgba(255, 206, 86, 0.6)'  // Cor para vendas mais baixas
      ];
      const borderColors = ['transparent', 'transparent', 'transparent'];

      myPieChart = new Chart(ctx, {
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
}

    function calculateTotalCost(costs) {
      const totalCostByMonth = {};
    
      // Iterate over each cost entry
      costs.forEach(cost => {
        const { dateIn, items } = cost;
        const yearMonth = dateIn.substring(0, 7); // Extract YYYY-MM from dateIn
        const monthN = new Date(yearMonth + '-01').toLocaleString('pt-PT', { month: 'long' }); // Convert to month name
        const monthName = monthN.charAt(0).toUpperCase() + monthN.slice(1)
        // Initialize total cost for the year-month if not already present
        if (!totalCostByMonth[monthName]) {
          totalCostByMonth[monthName] = 0;
        }
    
        // Calculate total cost for the items and add to the total cost for the year-month
        const totalCostForItems = items.reduce((acc, item) => {
          return acc + (item.quantity * item.product.shop);
        }, 0);
    
        totalCostByMonth[monthName] += totalCostForItems;
      });
    
      // Convert the object to an array of objects with 'month' and 'sum' properties
      const resultArray = Object.entries(totalCostByMonth).map(([month, sum]) => ({ month, sum }));
    
      return resultArray;
    }
    


    function processSalesData(salesData) {
      const processedData = salesData.map(sale => {
          const { dateIn, _sum } = sale;
          const date = new Date(dateIn);
          const month = date.toLocaleString('pt-PT', { month: 'long' }); // Obtém o nome do mês
          const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
          const year = date.getFullYear();
          return { monthYear: `${capitalizedMonth}-${year}`, sum: parseFloat(_sum.totalAmount) }; // Concatenate month name with year
      });
      
      // Clear existing data in global arrays
      salesMonths.length = 0;
      salesValues.length = 0;
  
      // Setting values
      processedData.forEach(item => {
          salesValues.push(item.sum);
          salesMonths.push(item.monthYear);
      });
  }
  
    