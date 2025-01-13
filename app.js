const express = require('express');
const logger = require('./middleware/logger');
const {notFound,errorHandler} = require('./middleware/error')
require('dotenv').config();
const { connectToDb } = require('./config/db');

// conecction db
connectToDb();

//init
const app = express();
// Apply Middlewares
app.use(express.json()); 
app.use(logger)

// Routes
app.use('/api/books',require('./routes/books'));
app.use('/api/authors',require('./routes/authors'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/users',require('./routes/users'));
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