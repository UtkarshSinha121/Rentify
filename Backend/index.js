
const express = require('express');
require('dotenv').config({path: '.env'});

const app = express();
const port = 5000;


const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

const userRouter = require('./routers/userRouter');
const addhouseRouter = require('./routers/addhouseRouter');
const utilRouter = require('./routers/util');

app.use('/user', userRouter);
app.use('/addhouse', addhouseRouter);
app.use('/util', utilRouter);

app.use(express.static('./uploads'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
