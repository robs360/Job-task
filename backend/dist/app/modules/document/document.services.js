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
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentServices = void 0;
const document_interface_1 = require("./document.interface");
const createDocumentIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const result = yield document_interface_1.documentModel.create(payload);
    console.log("it is result", result);
    return result;
});
const deleteDocumentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield document_interface_1.documentModel.deleteOne({ _id: id });
    return result;
});
exports.documentServices = {
    createDocumentIntoDB, deleteDocumentFromDB
};
