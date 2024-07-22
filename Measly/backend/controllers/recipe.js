const {StatusCodes} = require('http-status-codes')
const request = require('request');
const Information = require('../models/Information')

const getRecipe = async (req,res) => {
    let query = req.query.name
    console.log("HERE")
    request.get({
        url: 'https://api.api-ninjas.com/v1/recipe?query=' + query,
        headers: {
            'X-Api-Key': process.env.API_KEY
        },
    }, function(error, response, body) {
        if (error || response.statusCode != 200){
            res.status(StatusCodes.BAD_REQUEST).json({error})
        }else{
            res.status(StatusCodes.OK).json(JSON.parse(body))
        }
    });
}

const getUserProfile = async (req,res) => {
    const info = await Information.find({createdBy:req.user._id}).sort('createdAt')
    let query = []
    info.forEach( info => {
        info.ingredients.forEach( ing =>{
            query.push(ing)
        })
    })
    query = query.join(' and ')
    request.get({
        url: 'https://api.api-ninjas.com/v1/nutrition?query=' + query,
        headers: {
          'X-Api-Key': process.env.API_KEY
        },
      }, function(error, response, body) {
          if (error || response.statusCode != 200){
              res.status(StatusCodes.BAD_REQUEST).json({error})
          }else{
              res.status(StatusCodes.OK).json(JSON.parse(body))
          }
      });
}
module.exports = {getRecipe , getUserProfile}


//https://api-ninjas.com/api/recipe