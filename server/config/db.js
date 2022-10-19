const mongoose = require('mongoose');
const config = require('config');
const mongooseURI = config.get('mongoURI');

const connectToMongo = ()=> {
    mongoose.connect(mongooseURI,()=>{
        console.log("Successfully connected to Mongoose!");
    })
}

module.exports = connectToMongo;