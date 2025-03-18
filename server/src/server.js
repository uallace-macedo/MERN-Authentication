import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import connectDB from './config/db.js';
import routes from './routes/index.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(cors());

app.use(routes);

const $SERVERPORT = process.env.SERVER_PORT;

app.listen($SERVERPORT, async () => {
  console.log(`> Server Running as: http://localhost:${$SERVERPORT}`);
  await connectDB();
});
