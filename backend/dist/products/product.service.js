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
exports.updateProductQty = exports.updateProduct = exports.destroy = exports.findByName = exports.findByBarcode = exports.findById = exports.findAll = exports.createProduct = void 0;
var db_server_1 = require("../utiles/db.server");
// create product
function createProduct(formData) {
    return __awaiter(this, void 0, void 0, function () {
        var product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_server_1.db.product.create({
                        data: {
                            name: formData.name,
                            barcode: formData.barcode,
                            sell: formData.sell,
                            shop: formData.shop,
                            quantity: formData.quantity,
                            expiresIn: formData.expiresIn,
                            category: {
                                connectOrCreate: {
                                    where: { name: formData.categoryName },
                                    create: { name: formData.categoryName }
                                }
                            }
                        }
                    })];
                case 1:
                    product = _a.sent();
                    return [2 /*return*/, product];
            }
        });
    });
}
exports.createProduct = createProduct;
//   Get all products
function findAll() {
    return __awaiter(this, void 0, void 0, function () {
        var products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_server_1.db.product.findMany({
                        orderBy: { id: 'desc' },
                        select: {
                            id: true,
                            name: true,
                            barcode: true,
                            sell: true,
                            shop: true,
                            quantity: true,
                            expiresIn: true,
                            createdAt: true,
                            category: true
                        }
                    })];
                case 1:
                    products = _a.sent();
                    return [2 /*return*/, products];
            }
        });
    });
}
exports.findAll = findAll;
// Get single product by id
function findById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_server_1.db.product.findUnique({ where: { id: id }, select: {
                            id: true,
                            name: true,
                            barcode: true,
                            sell: true,
                            shop: true,
                            quantity: true,
                            category: {
                                select: {
                                    name: true
                                }
                            }
                        } })];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, user];
            }
        });
    });
}
exports.findById = findById;
// Get single product by barcode
function findByBarcode(barcode) {
    return __awaiter(this, void 0, void 0, function () {
        var product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_server_1.db.product.findUnique({ where: { barcode: barcode }, select: {
                            id: true,
                            name: true,
                            barcode: true,
                            sell: true,
                            quantity: true
                        } })];
                case 1:
                    product = _a.sent();
                    return [2 /*return*/, product];
            }
        });
    });
}
exports.findByBarcode = findByBarcode;
// Get single product by name
function findByName(name) {
    return __awaiter(this, void 0, void 0, function () {
        var product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_server_1.db.product.findUnique({ where: { name: name }, select: {
                            id: true,
                            name: true,
                            barcode: true,
                            sell: true,
                            quantity: true
                        } })];
                case 1:
                    product = _a.sent();
                    return [2 /*return*/, product];
            }
        });
    });
}
exports.findByName = findByName;
// Delete product
function destroy(id) {
    return __awaiter(this, void 0, void 0, function () {
        var product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_server_1.db.product.delete({ where: { id: id } })];
                case 1:
                    product = _a.sent();
                    return [2 /*return*/, product];
            }
        });
    });
}
exports.destroy = destroy;
// update product
function updateProduct(id, formData) {
    return __awaiter(this, void 0, void 0, function () {
        var product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_server_1.db.product.update({
                        where: { id: id },
                        data: {
                            name: formData.name,
                            barcode: formData.barcode,
                            sell: formData.sell,
                            shop: formData.shop,
                            quantity: formData.quantity,
                            expiresIn: formData.expiresIn,
                            categoryId: formData.categoryId
                        }
                    })];
                case 1:
                    product = _a.sent();
                    return [2 /*return*/, product];
            }
        });
    });
}
exports.updateProduct = updateProduct;
// Reduce product quantity
function updateProductQty(items) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, items_1, item, existingProduct, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    _i = 0, items_1 = items;
                    _a.label = 1;
                case 1:
                    if (!(_i < items_1.length)) return [3 /*break*/, 8];
                    item = items_1[_i];
                    return [4 /*yield*/, db_server_1.db.product.findUnique({
                            where: { id: item.productId },
                            select: { quantity: true },
                        })];
                case 2:
                    existingProduct = _a.sent();
                    if (!(existingProduct != null)) return [3 /*break*/, 6];
                    if (!(item.quantity <= existingProduct.quantity)) return [3 /*break*/, 4];
                    return [4 /*yield*/, db_server_1.db.product.update({
                            where: { id: item.productId },
                            data: {
                                quantity: {
                                    decrement: item.quantity,
                                },
                            },
                        })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4: return [2 /*return*/, false];
                case 5: return [3 /*break*/, 7];
                case 6: return [2 /*return*/, false];
                case 7:
                    _i++;
                    return [3 /*break*/, 1];
                case 8: return [2 /*return*/, true];
                case 9:
                    error_1 = _a.sent();
                    return [2 /*return*/, false];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.updateProductQty = updateProductQty;
