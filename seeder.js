const {Book} = require('./models/Book')
const {books} = require('./data');
const connectDB = require('./config/db');
require('dotenv').config()

// Connection To Db
connectDB()

// Import Book
const importBooks = async () => {
    try {
        await Book.insertMany(books);
        console.log("Books imported"); 
    } catch (error) {
        console.log(error);
        process.exit(1);  
    }
}


// remove Book
const removeBooks = async () => {
    try {
        await Book.deleteMany();
        console.log("Books deleted"); 
    } catch (error) {
        console.log(error);
        process.exit(1);  
    }
}


if (process.argv[2] === "-import") {
    importBooks();
} else if(process.argv[2] === "-remove"){
    removeBooks();
}