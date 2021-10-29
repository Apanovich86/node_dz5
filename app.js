const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');
const swaggerUI = require('swagger-ui-express');

require('dotenv').config();

const {authRouter, userRouter} = require('./routes');
// const {INTERNAL_SERVER_ERROR} = require('./errors');
const {ALLOWED_ORIGIN, MONGO_CONNECT_URL, PORT, NODE_ENV, CORS_NOT_ALLOWED} = require('./configs');
const startCron = require('./cron');
const ErrorHandler = require('./errors/ErrorHandler');
const {checkDefaultData} = require('./util');
const swaggerJson = require('./docs/swagger.json');

const app = express();

mongoose.connect(MONGO_CONNECT_URL).then(() => {
    console.log('Mongo connected successful');
});

app.use(helmet());
app.use(cors({origin: _configureCors}));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));

if (NODE_ENV === 'dev') {
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

app.use(fileUpload({}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
    checkDefaultData();
    startCron();
});

function _configureCors(origin, callback) {
    if (NODE_ENV === 'dev') {
        return callback(null, true);
    }

    const whiteList = ALLOWED_ORIGIN.split(';');

    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler(CORS_NOT_ALLOWED), false);
    }

    return callback(null, true);
}

