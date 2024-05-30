const express = require('express');

const app = express();
const port = 5000;

const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

const userRouter = require('./routes/userRouter');

app.use('/user', userRouter);
