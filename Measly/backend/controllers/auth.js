const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError, ConflictRequestError} = require('../errors/index')
const jwt = require('jsonwebtoken')
//hashing password
const bcrypt = require('bcryptjs')

const register = async (req,res) => {
    exists = await User.find({email:req.body.email})
    if (exists.length != 0){
        throw new ConflictRequestError('Email in use')
        // res.status(StatusCodes.CONFLICT).json({err:"Email in Use"})
    }
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user:{firstname:user.firstname,lastname:user.lastname,email:user.email}, token})
    
}

const login = async (req,res) => {
    const {email,password} = req.body
    if (!email || !password ){
        throw new BadRequestError('Please provide email and password')
        // res,status
    }
    const user = await User.findOne({email})
    
    if( !user ){
        throw new UnauthenticatedError('Invalid Credentioanls')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentioanls')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user:{firstname:user.firstname,lastname:user.lastname,email:user.email}, token})
}

module.exports = {register , login}