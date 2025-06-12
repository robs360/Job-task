"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../app/modules/user/user.route");
const document_route_1 = require("../app/modules/document/document.route");
const router = express_1.default.Router();
const modulesRouter = [
    {
        path: '/user',
        route: user_route_1.userRoutes
    },
    {
        path: '/document',
        route: document_route_1.documentRoutes
    }
];
modulesRouter.forEach((route) => router.use(route.path, route.route));
exports.default = router;
