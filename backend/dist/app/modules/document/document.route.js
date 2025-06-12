"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const document_controller_1 = require("./document.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.post('/create', auth_1.default, document_controller_1.documentController.createDocument);
router.get('/', auth_1.default, document_controller_1.documentController.getAlldocument);
router.get('/:id', auth_1.default, document_controller_1.documentController.getSingleDocument);
router.put('/:id', auth_1.default, document_controller_1.documentController.updateDocument);
router.delete('/:id', auth_1.default, document_controller_1.documentController.deleteDocument);
exports.documentRoutes = router;
