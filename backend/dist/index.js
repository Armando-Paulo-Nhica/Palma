"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var cors = require('cors');
require('dotenv').config();
// import { createBarcode } from './barcode/barcodeService';
// import { productRouter } from './products/product.router';
var category_router_1 = require("./categories/category.router");
var supplier_router_1 = require("./suppliers/supplier.router");
var purchase_router_1 = require("./purchases/purchase.router");
var service_router_1 = require("./services/service.router");
var company_router_1 = require("./companies/company.router");
var employer_router_1 = require("./employers/employer.router");
var product_router_1 = require("./products/product.router");
var sale_router_1 = require("./sales/sale.router");
var port = 3000;
var app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:8080',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
// app.use("/api/products", productRouter);
app.use("/api/categories", category_router_1.categoryRouter);
app.use("/api/suppliers", supplier_router_1.supplierRouter);
app.use("/api/purchases", purchase_router_1.purchaseRouter);
app.use("/api/services", service_router_1.serviceRouter);
app.use("/api/companies", company_router_1.companyRouter);
app.use("/api/users", employer_router_1.employerRouter);
app.use("/api/products", product_router_1.productRouter);
app.use("/api/sales", sale_router_1.SaleRouter);
app.listen(port, function () {
    console.log("Servidor Express rodando na porta ".concat(port));
});
