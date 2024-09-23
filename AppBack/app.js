import express from 'express';
import { apiRouter } from './routes/api.js';
import cors from 'cors';
import { client } from './config/db.js';

import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api', apiRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor esuchando en http://localhost:${PORT}`)
})