import dotenv from 'dotenv';
const express = require('express');
const cors = require('cors');


// Load environment variables from .env file
dotenv.config();


// import { createBarcode } from './barcode/barcodeService';
// import { productRouter } from './products/product.router';
import { categoryRouter } from './categories/category.router';
import { supplierRouter } from './suppliers/supplier.router';
import { purchaseRouter } from './purchases/purchase.router';
import { serviceRouter } from './services/service.router';
import { companyRouter } from './companies/company.router';
import { userRouter } from './users/user.router';
import { productRouter } from './products/product.router';
import { SaleRouter } from './sales/sale.router';
const port = 3000;
const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:8080', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/suppliers", supplierRouter);
app.use("/api/purchases", purchaseRouter);
app.use("/api/services", serviceRouter);
app.use("/api/companies", companyRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/sales", SaleRouter);

app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});

