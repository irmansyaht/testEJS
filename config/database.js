//Setup Database

const mongoose = require('mongoose');

const mongodb = 'mongodb+srv://firstapp:abc123abc@firstapp-10q2o.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(
    mongodb,{useNewUrlParser:true}
).then(()=>console.log('MongoDB Connected'))

mongoose.Promise = global.Promise;

module.exports = mongoose;