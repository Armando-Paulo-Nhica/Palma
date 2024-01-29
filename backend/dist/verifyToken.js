"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenAndAdmin = exports.verifyTokenAndAuthorization = exports.verifyToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var SECRET = parseInt('hsI89nDq32nsk', 10);
var verifyToken = function (req, res, next) {
    var authHeader = req.headers.token;
    if (authHeader) {
        var token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, SECRET.toString(), function (err, user) {
            if (err)
                res.status(403).json("Token is not valid!");
            req.user = user;
            next();
        });
    }
    else {
        return res.status(401).json("You are not authenticated!");
    }
};
exports.verifyToken = verifyToken;
var verifyTokenAndAuthorization = function (req, res, next) {
    verifyToken(req, res, function () {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json("You are not allowed to do that!");
        }
    });
};
exports.verifyTokenAndAuthorization = verifyTokenAndAuthorization;
var verifyTokenAndAdmin = function (req, res, next) {
    verifyToken(req, res, function () {
        if (req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json("You are not allowed to do that!");
        }
    });
};
exports.verifyTokenAndAdmin = verifyTokenAndAdmin;
