const {Book} = require('./models/Book')
const {Author} = require('./models/Author')
const {books,authors} = require('./data');
const connectDB = require('./config/db');
require('dotenv').config()

// Connection To Db
connectDB()
// ---------------------- Book ----------------//
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


// ----------------------------- author ------------------------  //

// import author
const importAuhors = async () =>{
    try {
        await Author.insertMany(authors);
        console.log("Authors imported");
    } catch (error) {
        console.log(error);
        process.exit(1);  
    }
}

// remove author 
const removeAuthors = async ()=>{
    try {
        await Author.deleteMany();
        console.log("Author deleted");
    } catch (error) {
        console.log(error);
        process.exit(1);
        
    }
}



if (process.argv[2] === "-import") {
    importBooks();
} else if(process.argv[2] === "-remove"){
    removeBooks();
}else if(process.argv[2] === "-import-author"){
    importAuhors();
}else if(process.argv[2] === "-remove-author"){
    removeAuthors();
}