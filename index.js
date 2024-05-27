const express = require('express');
const nunjucks = require('nunjucks'); 

const app = express();
const cors = require('cors');

// app.use(cors({
//   origin: 'http://localhost:8080', 
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
// }));
app.use((req, res, next) => {
  res.locals.apiUrl = process.env.API_URL;
  next();
});


const saleRoutes = require('./routes/sale/index');
const homeRoutes = require('./routes/home/index');
const shopRoutes = require('./routes/shop/index'); 
const userRoutes = require('./routes/user/index');
const invoiceRoutes = require('./routes/invoice/index');
const productRoutes = require('./routes/product/index');
const companyRoutes = require('./routes/company/index');
const port = process.env.PORT
require('dotenv').config();


// Configure Nunjucks with the correct views path
nunjucks.configure('public/views', {
  autoescape: true,
  express: app
});
 


app.use(express.static('public'));
// Use the route files
app.use('/', homeRoutes);
app.use('/sale', saleRoutes);
app.use('/product', shopRoutes);
app.use('/stock', productRoutes);
app.use('/user', userRoutes);
app.use('/invoice', invoiceRoutes);
app.use('/office', companyRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});

