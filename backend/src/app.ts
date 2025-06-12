import express, { Application } from 'express'
import cors from "cors";
import router from './routes';
export const app:Application = express()
app.use(express.json());
app.use(cors());
app.use("/api/v1", router);
app.get('/', (req, res) => {
  res.send('Hello World')
})

