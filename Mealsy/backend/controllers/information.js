const Information = require('../models/Information')
const {StatusCodes } = require('http-status-codes')
const {BadRequestError,NotFoundError} = require('../errors/index')

const getAllinformation = async (req,res) => {
    const info = await Information.find({createdBy:req.user._id}).sort('createdAt')
    res.status(StatusCodes.OK).json({info})
}

const getInfo = async (req,res) => {
    const {
        user:{_id:userId},
        params:{id:infoId},
    } = req

    const info = await Information.findOne({_id:infoId,createdBy:userId})
    
    if(!info){
        throw new NotFoundError(`No info with id ${info}`)
    }
    res.status(StatusCodes.OK).json({info})
}

const createInfo = async (req,res) => {
    req.body.createdBy = req.user._id
    const info = await Information.create(req.body)
    res.status(StatusCodes.CREATED).json({info})
}

const updateInfo = async (req,res) => {
    const {
        user:{_id:userId},
        params:{id:infoId},
        body:{name}
    } = req
    
    if(name === ''){
        throw new BadRequestError("Name fields cannot be empty")
    }
    const info = await Information.findByIdAndUpdate({_id:infoId,createdBy:userId},req.body,{new:true,runValidators:true})
    if(!info){
        throw new NotFoundError(`No info with id ${info}`)
    }
    res.status(StatusCodes.OK).json({info})
}

const deleteinfo = async (req,res) => {
    const {
        user:{_id:userId},
        params:{id:infoId},
    } = req
    const info = await Information.findByIdAndRemove({_id:infoId,createdBy:userId})
    if(!info){
        throw new NotFoundError(`No info with id ${infoId}`)
    }
    res.status(StatusCodes.OK).send()
}

module.exports = {getAllinformation, getInfo, createInfo, updateInfo, deleteinfo }