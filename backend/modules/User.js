const mongoose = require('mongoose')
const config = require('../config.json')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profile_pic:{
        type:String,
        default:config.host_server + '/profile_pics/default.png'
    },
    liked_posts:{
        type:Array,
        default:[]
    }
})

module.exports = mongoose.model('user',UserSchema);