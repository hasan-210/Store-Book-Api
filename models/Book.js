const mongoose = require('mongoose');
const Joi = require('joi');

// Book Schema
const BookSchema = mongoose.Schema({
    title: {
        type: String,
        required:true,
        tirm:true,
        minlength:3,
        maxlength:250
    },
    author: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Author"
    },
    description: {
        type: String,
        required:true,
        trim:true,
        minlength:5
    },
    price: {
        type: Number,
        required:true,
        min:0
    },
    cover: {
        type: String,
        required:true,
        enum:['soft cover', 'hard cover']
    },
},{
    timestamps:true
});

const Book = mongoose.model("Book",BookSchema);

// Validation Create Book
function validateCreateBook(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(250).required(),
        author: Joi.string().required(),
        description: Joi.string().min(5).trim().required(),
        price: Joi.number().min(0).required(),
        cover: Joi.string().valid('soft cover', 'hard cover').required()
    });

    return schema.validate(obj);
}

// Validation Update Book
function validateUpdateBook(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(250),
        author: Joi.string(),
        description: Joi.string().min(5).trim(),
        price: Joi.number().min(0),
        cover: Joi.string().valid("soft delete",'hard delete')
    });

    return schema.validate(obj);
}
module.exports = {
    Book,
    validateCreateBook,
    validateUpdateBook
};