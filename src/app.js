const compression = require('compression')
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const express = require('express');
const app = express();


// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// init db
require('./dbs/init.mongodb');
const { checkOverload } = require('./helpers/check.connect');
checkOverload()


// init routes
app.get('/', (req, res, next) => {
    const strCompress = 'Hello Tien';
    return res.status(200).json({
        message: 'Welcome Le Tien!',
        metadata: strCompress.repeat(200)
    })
})

// handling error

module.exports = app