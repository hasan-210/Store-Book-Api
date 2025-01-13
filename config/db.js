const mongoose = require('mongoose');

async function  connectToDb(){
    // Connection To Database  - 1 -
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected To MongoDB")
    } catch (error) {
        console.log("Connection Failed To MongoDB!" , error)
    }
}

module.exports = {
    connectToDb
}
    // Connection To Database  - 2 -
    // mongoose.connect(process.env.MONGO_URI)
    // .then(()=>console.log("Connected To MongoDB"))
    // .catch((error) => console.log("Connection Failed To MongoDB!" , error))