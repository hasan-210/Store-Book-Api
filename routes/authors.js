const express = require('express');
const router = express.Router();
const { verfiyTokenAndAdmin } = require('../middleware/verfiyToken');
const { getAllAuthor, getAuthorById, createNewAuthor, updateAuthor, deleteAuthor } = require('../controllers/authorController');


// /api/authors
router.route('/')
       .get(getAllAuthor)
       .post(verfiyTokenAndAdmin ,createNewAuthor);

// /api/authors/:id
router.route('/:id')
      .get(getAuthorById)
      .put(verfiyTokenAndAdmin ,updateAuthor)
      .delete(verfiyTokenAndAdmin ,deleteAuthor);


module.exports = router