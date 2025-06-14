

import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config({ path: '.env.local' });

interface User {
  socketId: string;
  image: string;
  name: string;
}

const documentUsers: Record<string, User[]> = {};

async function main() {
  try {
    await mongoose.connect(process.env.database_url as string);
    console.log("MongoDB connected");

    const httpServer = createServer(app);

    const io = new Server(httpServer, {
      cors: {
        origin: ['http://localhost:3000', 'https://job-task-client-two.vercel.app'],
        methods: ['GET', 'POST']
      }
    });

    io.on("connection", (socket) => {
      console.log("User connected", socket.id);

      // Updated join-document event to include user info
      socket.on('join-document', ({ documentId, user }: { documentId: string, user: { name: string, image: string } }) => {
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

  } catch (error) {
    console.log(error);
  }
}

main().catch((err) => console.log(err));