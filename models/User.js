const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const passwordComplexity = require("joi-password-complexity");
const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:5,
        maxlength:100,
        unique:true
    },
    username:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:200
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true});
 
// Generate Token

UserSchema.methods.generateToken = function(){
    return  jwt.sign({id:this._id,isAdmin:this.isAdmin},process.env.JWT_SECRET_KEY)
}

// User Model
const User = mongoose.model('User',UserSchema);

// validate register user
function  validateRegisterUser(obj){
    const schema = Joi.object({
        email:Joi.string().trim().min(5).max(100).required().email(),
        username:Joi.string().trim().min(2).max(200).required(),
        password:passwordComplexity().required(),
    });
    return schema.validate(obj);
}

// validate login user
function  validateLoginUser(obj){
    const schema = Joi.object({
        email:Joi.string().trim().min(5).max(100).required().email(),
        password:Joi.string().trim().min(6).required(),
    });
    return schema.validate(obj);
}

// validate Change Password
function  validateChangePassword(obj){
    const schema = Joi.object({
        password:Joi.string().trim().min(6).required(),
    });
    return schema.validate(obj);
}
// validate update user
// validate login user
function  validateUpdateUser(obj){
    const schema = Joi.object({
        email:Joi.string().trim().min(5).max(100).email(),
        username:Joi.string().trim().min(2).max(200),
        password:Joi.string().trim().min(6),
    });
    return schema.validate(obj);
}
module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser,
    validateChangePassword
}