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
const documentUsers = {};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(process.env.database_url);
            console.log("MongoDB connected");
            const httpServer = (0, http_1.createServer)(app_1.app);
            const io = new socket_io_1.Server(httpServer, {
                cors: {
                    origin: ['http://localhost:3000', 'https://job-task-client-two.vercel.app'],
                    methods: ['GET', 'POST']
                }
            });
            io.on("connection", (socket) => {
                console.log("User connected", socket.id);
                // Updated join-document event to include user info
                socket.on('join-document', ({ documentId, user }) => {
                    socket.join(documentId);
                    console.log(`${user.name} joined document ${documentId}`);
                    if (!documentUsers[documentId]) {
                        documentUsers[documentId] = [];
                    }
                    const existing = documentUsers[documentId].find(u => u.image === user.image);
                    if (!existing) {
                        documentUsers[documentId].push({ socketId: socket.id, image: user.image, name: user.name });
                    }
                    // Broadcast current online users in this document
                    io.to(documentId).emit('document-users', documentUsers[documentId]);
                });
                socket.on('send-changes', ({ documentId, content }) => {
                    socket.to(documentId).emit('receive-changes', content);
                });
                socket.on('disconnect', () => {
                    console.log("User disconnected", socket.id);
                    for (const documentId in documentUsers) {
                        documentUsers[documentId] = documentUsers[documentId].filter(user => user.socketId !== socket.id);
                        io.to(documentId).emit('document-users', documentUsers[documentId]);
                    }
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
