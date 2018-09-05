const mongoose = require('mongoose');
//ahoj
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose: mongoose};