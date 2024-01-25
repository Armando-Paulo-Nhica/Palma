const express = require('express');
const nunjucks = require('nunjucks'); 
const app = express();
const cors = require('cors');

require('dotenv').config();

app.use(cors({
  origin: 'http://localhost:8080', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

const saleRoutes = require('./routes/sale/index');
const homeRoutes = require('./routes/home/index');
const shopRoutes = require('./routes/shop/index');

const port = 8080

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


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
