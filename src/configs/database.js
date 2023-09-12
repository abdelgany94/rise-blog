const mongoose = require("mongoose");

const connectMongo = ()=> {
    const DB_STRING = process.env.MONGODB_URI;
    try{
        console.debug("start connecting database");
        mongoose.connect(DB_STRING, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
                autoIndex: true,
            });
        console.debug("database connected");
    } catch (e) {
        console.error(e);
    }
};    
module.exports = {connectMongo};