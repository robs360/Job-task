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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./app");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
dotenv_1.default.config({ path: '.env.local' });
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(process.env.database_url);
            console.log("MongoDB connected");
            // Create HTTP server
            const httpServer = (0, http_1.createServer)(app_1.app);
            // Create socket.io instance
            const io = new socket_io_1.Server(httpServer, {
                cors: {
                    origin: ['http://localhost:3000', 'https://job-task-client-two.vercel.app'],
                    methods: ['GET', 'POST']
                }
            });
            io.on("connection", (socket) => {
                console.log("User connected", socket.id);
                socket.on('join-document', (documentId) => {
                    socket.join(documentId);
                    console.log(`User joined document room: ${documentId}`);
                });
                socket.on('send-changes', ({ documentId, content }) => {
                    socket.to(documentId).emit('receive-changes', content);
                });
                socket.on('disconnect', () => {
                    console.log("User disconnected", socket.id);
                });
            });
            const PORT = process.env.PORT || 5000;
            httpServer.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
main().catch((err) => console.log(err));
