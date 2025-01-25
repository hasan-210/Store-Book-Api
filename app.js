const express = require('express');
const logger = require('./middleware/logger');
const {notFound,errorHandler} = require('./middleware/error')
require('dotenv').config();
const connectToDb  = require('./config/db');
const path = require("path") 
// conecction db
connectToDb();

//init
const app = express();

// Static Folder
app.use(express.static(path.join(__dirname,"images")));

// Apply Middlewares
app.use(express.json()); 
app.use(express.urlencoded({extended: false}))
app.use(logger)
app.set('view engine', 'ejs');

// Routes
app.use('/api/books',require('./routes/books'));
app.use('/api/authors',require('./routes/authors'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/users',require('./routes/users'));
app.use('/api/upload',require('./routes/upload'));
app.use('/password',require('./routes/password'));



// Error Handler Middleware
app.use(notFound)
app.use(errorHandler);

// 1 - url
// 2 - collback function - route handler with 2 aregument (req , res)
// app.get('/test',(req,res) => {
//     res.send("Hello , Welcome To Express Js")
// })

// Running the server
// 1 - port 
// 2 - collback function
const PORT = process.env.PORT ;
app.listen(PORT,()=>console.log(`server Is Running in ${process.env.NODE_ENV} listening on port ${PORT}`))