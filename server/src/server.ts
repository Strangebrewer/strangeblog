import express from 'express';
import 'dotenv/config';

import routes from './routes';
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '16mb' }));
app.use(express.text());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

app.use(routes)

app.listen(3001, () =>
  console.log('REST API server ready at: http://localhost:3001'),
);
