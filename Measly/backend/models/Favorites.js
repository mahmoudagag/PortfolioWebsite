const mongoose = require('mongoose')

const FavoritesSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Please provide name'],
        maxlength:50,
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please provide user']
    },
    ingredients:{
        type:Array,
    },    
    instructions:{
        type:String
    },
},{timestamps:true})


module.exports = mongoose.model('Favorite',FavoritesSchema)