
//dev
const dev = {
    app: {
        port: process.env.DEV_APP_PORT || 3052
    },
    db: {
        host: process.env.DEV_APP_HOST || '0.0.0.0',
        port: process.env.DEV_APP_PORT || 27017,
        name: process.env.DEV_APP_NAME || 'shopDev'
    }
};

// product 
const product = {
    app: {
        port: process.env.PRODUCT_APP_PORT || 3000
    },
    db: {
        host: process.env.DEV_APP_HOST || '0.0.0.0',
        port: process.env.DEV_APP_PORT || 27017,
        name: process.env.DEV_APP_NAME || 'shopPro'
    }
};
const config = { dev, product };
const env = process.env.NODE_ENV || 'dev'
module.exports = config[env]