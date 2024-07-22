const Favorite = require('../models/Favorites')
const {StatusCodes } = require('http-status-codes')
const {BadRequestError,NotFoundError} = require('../errors/index')

const getFavorites = async (req,res) => {
    const fav = await Favorite.find({createdBy:req.user._id}).sort('createdAt')
    console.log(fav)
    res.status(StatusCodes.OK).json(fav)
}

const createFavorite = async (req,res) => {
    console.log(req.body)
    req.body.createdBy = req.user._id
    console.log(req.body)
    const fav = await Favorite.create(req.body)
    res.status(StatusCodes.CREATED).json({fav})
}

const deleteFavorite = async (req,res) => {
    const {
        user:{_id:userId},
        params:{id:favoriteId},
    } = req
    const info = await Favorite.findByIdAndRemove({_id:favoriteId,createdBy:userId})
    if(!info){
        throw new NotFoundError(`No info with id ${favoriteId}`)
    }
    res.status(StatusCodes.OK).send()
}

const getFavorite = async (req,res) => {
    const {
        user:{_id:userId},
        params:{id:favoriteId},
    } = req

    const favorite = await Favorite.findOne({_id:favoriteId,createdBy:userId})
    
    if(!favorite){
        throw new NotFoundError(`No job with id ${favoriteId}`)
    }
    res.status(StatusCodes.OK).json({favorite})
}
module.exports = {getFavorites, createFavorite, deleteFavorite,getFavorite}