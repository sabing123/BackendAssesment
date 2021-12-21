const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();
const path = require('path');
const cors = require('cors');

const userRouter = require('./routes/user');
const uploadRouter = require('./routes/upload');

const auth = require('./routes/auth');


const categoryRouter = require('./routes/categories');
const productRouter = require('./routes/products');

const app = express();
app.use(morgan('tiny'));

mongoose.connect(process.env.DbURI, {
    useNewUrlParser: true, 

    useUnifiedTopology: true 
}).then(() => {
    console.log('Connected to database server');
});

app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.send('Welcome, to my app');
});

app.use('/api/users', userRouter);
app.use('/categories', auth.verifyAdmin, categoryRouter);
app.use('/products', auth.verifyAdmin, productRouter );


app.use((req, res, next) => {
    let err = new Error('Not found!');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({
        status: 'error',
        message: err.message
    });
})

app.listen(process.env.Port, () => {
    console.log(`Server is running at localhost:${process.env.Port}`);
});