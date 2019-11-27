//Setup Database

const mongoose = require('mongoose');

const mongodb = 'mongodb://localhost:27017/First_App';

mongoose.connect(
    mongodb,{useNewUrlParser:true}
).then(()=>console.log('MongoDB Connected'))

mongoose.Promise = global.Promise;

module.exports = mongoose;