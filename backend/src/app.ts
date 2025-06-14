import express, { Application } from 'express'
import cors from "cors";
import router from './routes';
export const app:Application = express()

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',  // only allow local frontend
  credentials: true
}));
app.use("/api/v1", router);
app.get('/', (req, res) => {
  res.send('Hello World')
})

