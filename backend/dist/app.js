"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'https://job-task-client-two.vercel.app'], // only allow local frontend
    credentials: true
}));
exports.app.use("/api/v1", routes_1.default);
exports.app.get('/', (req, res) => {
    res.send('Hello World');
});
