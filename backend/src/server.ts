
import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app";
import { createServer } from "http";
import { Server } from "socket.io";
dotenv.config({ path: '.env.local' });
async function main() {
    try {

        await mongoose.connect(process.env.database_url as string);

        console.log("MongoDB connected");

        // Create HTTP server
        const httpServer = createServer(app);

        // Create socket.io instance
        const io = new Server(httpServer, {
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

    } catch (error) {
        console.log(error);
    }
}
main().catch((err) => console.log(err));
