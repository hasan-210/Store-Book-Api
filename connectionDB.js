const mongoose = require('mongoose');
const dontenv = require('dotenv');
dontenv.config();
// Connection To Database
mongoose.connect(process.env.MONGO_URI)
        .then(()=>console.log("Connected To MongoDB"))
        .catch((error) => console.log("Connection Failed To MongoDB!" , error))
