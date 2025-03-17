import express from 'express';
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const $SERVERPORT = process.env.SERVER_PORT;
console.log($SERVERPORT);

app.listen($SERVERPORT, () => {
  console.log(`Server Running as: http://localhost:${$SERVERPORT}`);
});
