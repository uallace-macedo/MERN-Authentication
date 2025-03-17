import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(cors({
  origin: '*',
  credentials: true
}));

const $SERVERPORT = process.env.SERVER_PORT;

app.listen($SERVERPORT, async () => {
  console.log(`> Server Running as: http://localhost:${$SERVERPORT}`);
  await connectDB();
});
