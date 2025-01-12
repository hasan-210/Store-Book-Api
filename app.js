const express = require('express');
const booksPath = require('./routes/books');
const authorsPath = require('./routes/authors');
const authPath = require('./routes/auth');
const connectionDB = require('./connectionDB');
const logger = require('./middleware/logger');
const {notFound,errorHandler} = require('./middleware/error')
// console.log('Environment Variables:', process.env);
//init
const app = express();
// Apply Middlewares
app.use(express.json()); 
app.use(logger)

// Routes
app.use('/api/books',booksPath);
app.use('/api/authors',authorsPath);
app.use('/api/auth',authPath);
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