const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tags:{
        type:Array
    },
    photos:{
        type:Array
    },
    author:{
        type: Object,
        required:true
    },
    likes:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model('post',PostSchema);