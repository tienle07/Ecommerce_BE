const mongoose = require('mongoose');

const connectSting = `mongodb://0.0.0.0:27017/shopDev`

mongoose.connect(connectSting).then(_ => console.log(`Connect to MongoDB test Successfully`))
    .catch(err => console.error(`Error connecting MongoDB + ${err}`));

//dev
if (1 === 1) {
    mongoose.set('debug', true);
    mongoose.set('debug', { color: true });
}

module.exports = mongoose