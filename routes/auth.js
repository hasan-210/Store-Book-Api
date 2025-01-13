const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')
const {validateRegisterUser , validateLoginUser , User} = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @desc Register New User
 * @route /api/auth/register
 * @method POST
 * @access public
 */

router.post('/register' , asyncHandler(
    async (req,res) => {
        const {error} = validateRegisterUser(req.body);
        if(error){
            return res.status(400).json({message:error.details[0].message})
        }
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({message:'Email already exists'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        user = new User({
            email: req.body.email,
            password: hashedPassword,
            username: req.body.username,
        });

        const result = await user.save();
        const token = user.generateToken();
        const {password , ...other} = result._doc;
        res.status(201).json({...other,token}); 
    }
));

/**
 * @desc Login User
 * @route /api/auth/login
 * @method POST
 * @access public
 */

router.post('/login' , asyncHandler(
    async (req,res) => {
        const {error} = validateLoginUser(req.body);
        if(error){
            return res.status(400).json({message:error.details[0].message})
        }
        let user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(400).json({message:'invalid email or password'})
        }

        const isPasswordMatch =await bcrypt.compare(req.body.password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({message:'invalid email or password'})
        }
        const token = user.generateToken();
        // const token = jwt.sign({id:user._id,username:user.username},"secretKey",{
        //     expiresIn:"4d"
        // });
        const {password , ...other} = user._doc;
        res.status(201).json({...other,token}); 
    }
));

module.exports = router