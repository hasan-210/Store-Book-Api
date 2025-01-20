const asyncHandler = require('express-async-handler');
const { Book,validateCreateBook , validateUpdateBook} = require('../models/Book');




    // Comparioson Query Operator
    // price : 10 |    price : {$eq:10}  to get data when price = 10
    // price : {$ne:10}  get all data when price != 10
    // price : {$lt :10} get data when price less than  10 
    // price : {$lte:10} get data when price less than and equal to 10
    // price : {$gt:10}  get data when price greater than 10
    // price : {$gte:10}  get data when price greater than and equal to 10
    // price : {$in:[9,10]} get data when price equal to 9 and 10
    // price : {$nin:[9,10]} get data when price not equal ( 9 and 10 )
    // const books = await Book.find({
    //     price : {$in:[9,10]}
    // })

    /**
     *  @desc   Get All Book 
     *  @route  /api/books
     *  @method GET 
     *  @access public
     */
        
const getAllBook = asyncHandler(async (req,res) => {
    const {minPrice , maxPrice} = req.query ;
    let books ;
    if(minPrice && maxPrice){
        books = await Book.find({
            price : {$gte:minPrice, $lte:maxPrice}
        })
        .populate('author',[
            "_id",
            "firstName",
            "lastName"
        ]);
    }else {
        books = await Book.find().populate('author',[
            "_id",
            "firstName",
            "lastName"
        ]);
    }
    res.status(200).json(books)
    }
);

/**
 *  @desc   Get Book By Id
 *  @route  /api/books/:id
 *  @method GET 
 *  @access public
 */

const getBookById = asyncHandler(
    async (req,res) => {
        const book = await Book.findById(req.params.id).populate('author',["_id","firstName","lastName"]);
        if(book){
            res.status(200).json(book);
        }else{
            res.status(404).json({message:"book not found"});
        }
    }
);


/**
 *  @desc   Create new book
 *  @route  /api/books
 *  @method POST 
 *  @access private (only admin)
 */

const createNewBook =  asyncHandler( 
  async (req,res) => {
        const {error} = validateCreateBook(req.body);
        if(error){
            // return res.status(400).json(error);
            return res.status(400).json({message:error.details[0].message});
        }

        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            price: req.body.price,
            cover: req.body.cover
        });
        const result = await book.save();
        res.status(201).json(result);
    }
);

/**
 *  @desc   Update a book
 *  @route  /api/books/:id
 *  @method PUT 
 *  @access private (only admin)
 */

const updateBookById = asyncHandler(
    async (req,res) => {
        const {error} = validateUpdateBook(req.body);
        if(error){
            // return res.status(400).json(error);
            return res.status(400).json({message:error.details[0].message});
        }
        const book = await Book.findByIdAndUpdate(req.params.id,{
            $set: {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                price: req.body.price,
                cover: req.body.cover
            }
        },{new:true});
        res.status(200).json(book)
    }
);
/**
 *  @desc   Delete a book
 *  @route  /api/books/:id
 *  @method DELETE 
 *  @access private (only admin)
 */

const deleteBook =  asyncHandler(
    async(req,res) => {
    const book = await Book.findById(req.params.id);
    if(book){
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "book has been Deleted successfully"})
    }else {
        res.status(404).json({message:"book not found"});
    }
});

module.exports = {
    getAllBook,
    getBookById,
    createNewBook,
    updateBookById,
    deleteBook
}