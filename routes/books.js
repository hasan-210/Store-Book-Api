const express = require('express');
const router = express.Router();
const { verfiyTokenAndAdmin } = require('../middleware/verfiyToken');
const { getAllBook ,getBookById,createNewBook,updateBookById,deleteBook} = require('../controllers/bookController')


// /api/books
router.route('/')
        .get(getAllBook)
        .post(verfiyTokenAndAdmin ,createNewBook);
// /api/books/:id
router.route('/:id')      
      .get(getBookById)
      .put(verfiyTokenAndAdmin ,updateBookById)
      .delete(verfiyTokenAndAdmin ,deleteBook)



module.exports = router ;