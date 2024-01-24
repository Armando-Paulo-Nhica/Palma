
const express = require('express');
// import { createBarcode } from './barcode/barcodeService';
// import { productRouter } from './products/product.router';
import { categoryRouter } from './categories/category.router';
import { supplierRouter } from './suppliers/supplier.router';
import { purchaseRouter } from './purchases/purchase.router';
import { serviceRouter } from './services/service.router';
import { companyRouter } from './companies/company.router';
import { employerRouter } from './employers/employer.router';
import { productRouter } from './products/product.router';
import { SaleRouter } from './sales/sale.router';
const port = 3000;
const app = express();
app.use(express.json());

// app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/suppliers", supplierRouter);
app.use("/api/purchases", purchaseRouter);
app.use("/api/services", serviceRouter);
app.use("/api/companies", companyRouter);
app.use("/api/users", employerRouter);
app.use("/api/products", productRouter);
app.use("/api/sales", SaleRouter);

app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});

