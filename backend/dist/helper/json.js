"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json = function (param) {
    return JSON.stringify(param, function (key, value) { return (typeof value === "bigint" ? value.toString() : value); } // return everything else unchanged
    );
};
exports.default = json;
