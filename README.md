# 📄 Google Docs (MVP)


> It is a project were user can collaborate in same text file in real time. Other user can see you that what are you doing in the file. You can create file and share the file with other users with role based access like viewer or editor. I have done real time user activity here. For Authrntication i have done own customs auth system by jwt and google login. Specailly for google login i have combine my own system and Next Auth auth system. I mean when user login with google token will genarate from backend created by mine.  

---

## 🚀 Live Demo

[🔗 Live Site](https://job-task-client-two.vercel.app/)

---

## 📂 Tech Stack

- ⚛️ React / Next.js
- 🧑‍💻 TypeScript
- 🔐 JWT Authentication
- 🌐 NextAuth (Google Login)
- 🎯 Express.js (Backend API)
- 🗄️ MongoDB (Database)
- 💅 TailwindCSS (Styling)
- ☁️ Deployment: Vercel / Railway

---

## 📦 Features

- ✅ Custom Email & Password based Authentication (JWT)
- ✅ Google OAuth Login (NextAuth)
- ✅ Protected Routes & Authorization
- ✅ RESTful API (Express.js + MongoDB)
- ✅ SweetAlert2 Notifications
- ✅ Responsive UI with TailwindCSS

---

## 🏗️ Project Structure

```bash
project-root/
│
├── frontend/              # Next.js Frontend App
│   ├── src/               
│   │   ├── app/           # Next.js app directory (routes, pages)
│   │   ├── components/    # React components
│   │   ├── services/      # Axios services
│   │   └── utils/         # Helper functions, socket.io utils
│   │
│   └── package.json       
│
├── backend/               # Express.js Backend App
│   ├── src/
│   │   ├── middleware/    
│   │   │   └── authMiddleware.ts
│   │   │   └── errorMiddleware.ts
│   │
│   │   ├── module/
│   │   │
│   │   │   ├── document/
│   │   │   │   ├── document.controller.ts
│   │   │   │   ├── document.interface.ts
│   │   │   │   ├── document.model.ts
│   │   │   │   ├── document.route.ts
│   │   │   │   └── document.service.ts
│   │   │
│   │   │   ├── user/
│   │   │   │   ├── user.controller.ts
│   │   │   │   ├── user.interface.ts
│   │   │   │   ├── user.model.ts
│   │   │   │   ├── user.route.ts
│   │   │   │   └── user.service.ts
│   │
│   │   └── app.ts         
│   │   └── server.ts      
│
│   └── package.json       
│
├── README.md              
├── .env.local             
└── .gitignore

