"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePurchase = exports.destroy = exports.findById = exports.findAll = exports.create = void 0;
var db_server_1 = require("../utiles/db.server");
var barcode_1 = require("../utiles/barcode");
// Create
function create(formData) {
    return __awaiter(this, void 0, void 0, function () {
        var purchasesArray, purchaseData, createdPurchases, _i, purchasesArray_1, purchase, existingProduct, updatedProduct, error_1, existingCategory, category, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    purchasesArray = Array.isArray(formData) ? formData : [formData];
                    return [4 /*yield*/, db_server_1.db.purchase.create({
                            data: {
                                invoice: purchasesArray[0].invoice,
                                totalShop: purchasesArray[0].totalShop,
                                supplier: {
                                    connectOrCreate: {
                                        where: { name: purchasesArray[0].supplierName },
                                        create: { name: purchasesArray[0].supplierName, email: purchasesArray[0].email, contact: purchasesArray[0].contact }
                                    }
                                }
                            }
                        })];
                case 1:
                    purchaseData = _a.sent();
                    createdPurchases = [];
                    _i = 0, purchasesArray_1 = purchasesArray;
                    _a.label = 2;
                case 2:
                    if (!(_i < purchasesArray_1.length)) return [3 /*break*/, 15];
                    purchase = purchasesArray_1[_i];
                    return [4 /*yield*/, db_server_1.db.product.findUnique({
                            where: { name: purchase.name },
                        })];
                case 3:
                    existingProduct = _a.sent();
                    if (!existingProduct) return [3 /*break*/, 9];
                    return [4 /*yield*/, db_server_1.db.product.update({
                            where: { id: existingProduct.id },
                            data: {
                                quantity: existingProduct.quantity + purchase.quantity,
                                sell: purchase.sell,
                                shop: purchase.shop,
                            },
                        })];
                case 4:
                    updatedProduct = _a.sent();
                    // Create barcode
                    (0, barcode_1.generateBarcodeImage)(existingProduct.barcode.toString(), './public/barcodes');
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, db_server_1.db.purchaseProduct.create({
                            data: {
                                name: purchase.name,
                                sell: purchase.sell,
                                shop: purchase.shop,
                                quantity: purchase.quantity,
                                expiresIn: purchase.expiresIn,
                                productId: updatedProduct.id,
                                purchaseId: purchaseData.id,
                            },
                        })];
                case 6:
                    _a.sent();
                    createdPurchases.push(true);
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _a.sent();
                    // Handle the error
                    createdPurchases.push(false);
                    return [3 /*break*/, 8];
                case 8: return [3 /*break*/, 14];
                case 9: return [4 /*yield*/, db_server_1.db.category.findUnique({
                        where: { name: purchase.categoryName },
                    })];
                case 10:
                    existingCategory = _a.sent();
                    category = existingCategory
                        ? { connect: { id: existingCategory.id } }
                        : { create: { name: purchase.categoryName } };
                    _a.label = 11;
                case 11:
                    _a.trys.push([11, 13, , 14]);
                    // If the product doesn't exist, create a new product and purchase entry
                    return [4 /*yield*/, db_server_1.db.product.create({
                            data: {
                                name: purchase.name,
                                barcode: purchase.barcode,
                                sell: purchase.sell,
                                shop: purchase.shop,
                                quantity: purchase.quantity,
                                expiresIn: purchase.expiresIn,
                                category: category,
                                purchases: {
                                    create: [
                                        {
                                            name: purchase.name,
                                            sell: purchase.sell,
                                            shop: purchase.shop,
                                            quantity: purchase.quantity,
                                            expiresIn: purchase.expiresIn,
                                            purchaseId: purchaseData.id,
                                        },
                                    ],
                                },
                            },
                        })];
                case 12:
                    // If the product doesn't exist, create a new product and purchase entry
                    _a.sent();
                    (0, barcode_1.generateBarcodeImage)(purchase.barcode.toString(), './public/barcodes');
                    createdPurchases.push(true);
                    return [3 /*break*/, 14];
                case 13:
                    error_2 = _a.sent();
                    // Handle the error
                    createdPurchases.push(false);
                    return [3 /*break*/, 14];
                case 14:
                    _i++;
                    return [3 /*break*/, 2];
                case 15: 
                // ======== end new code
                // return Array.isArray(formData) ? createdPurchases : createdPurchases[0];
                return [2 /*return*/, true];
            }
        });
    });
}
exports.create = create;
//   Get all purchases
function findAll() {
    return __awaiter(this, void 0, void 0, function () {
        var purchase;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_server_1.db.purchase.findMany({
                        orderBy: { id: 'desc' },
                        select: {
                            id: true,
                            invoice: true,
                            totalShop: true,
                            supplier: true,
                            purchases: true,
                            createdAt: true,
                            updatedAt: true
                        }
                    })];
                case 1:
                    purchase = _a.sent();
                    return [2 /*return*/, purchase];
            }
        });
    });
}
exports.findAll = findAll;
// Get single purchase
function findById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var purchase;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_server_1.db.purchase.findUnique({
                        where: { id: id },
                        select: {
                            id: true,
                            totalShop: true,
                            invoice: true,
                            supplier: true,
                            purchases: {
                                select: {
                                    name: true,
                                    sell: true,
                                    shop: true,
                                    quantity: true,
                                    productId: true,
                                    product: true,
                                }
                            },
                            createdAt: true,
                            updatedAt: true
                        }
                    })];
                case 1:
                    purchase = _a.sent();
                    return [2 /*return*/, purchase];
            }
        });
    });
}
exports.findById = findById;
// Delete purchase
function destroy(id) {
    return __awaiter(this, void 0, void 0, function () {
        var purchase;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_server_1.db.purchase.delete({ where: { id: id } })];
                case 1:
                    purchase = _a.sent();
                    return [2 /*return*/, purchase];
            }
        });
    });
}
exports.destroy = destroy;
function updatePurchase(data, id) {
    return __awaiter(this, void 0, void 0, function () {
        var purchase, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_server_1.db.purchase.update({
                            where: { id: id },
                            data: {
                                invoice: data.invoice,
                                totalShop: data.totalShop,
                                supplierId: data.supplierId,
                                purchases: {
                                    update: data.products.map(function (item) { return ({
                                        where: { purchaseId_productId: { purchaseId: id, productId: item.productId } },
                                        data: {
                                            name: item.name,
                                            sell: item.sell,
                                            shop: item.shop,
                                            quantity: item.quantity,
                                            expiresIn: item.expiresIn,
                                            product: {
                                                update: {
                                                    where: { id: item.productId },
                                                    data: {
                                                        name: item.name,
                                                        sell: item.sell,
                                                        shop: item.shop,
                                                        quantity: item.quantity,
                                                        expiresIn: item.expiresIn,
                                                        categoryId: item.categoryId,
                                                    },
                                                },
                                            },
                                        },
                                    }); })
                                },
                            },
                            include: {
                                purchases: {
                                    include: {
                                        product: true,
                                    },
                                },
                            },
                        })];
                case 1:
                    purchase = _a.sent();
                    return [2 /*return*/, purchase];
                case 2:
                    error_3 = _a.sent();
                    throw error_3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updatePurchase = updatePurchase;
