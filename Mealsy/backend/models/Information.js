const mongoose = require('mongoose')

const InformationSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Please provide name'],
        maxlength:50,
    },
    ingredients:{
        type:Array,
    },
    date:{
        type:Date,
        required: [true,"Please provide Date"]
    },
    color:{
        type:String
    },
    instructions:{
        type:String
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please provide user']
    },
},{timestamps:true})


module.exports = mongoose.model('Information',InformationSchema)