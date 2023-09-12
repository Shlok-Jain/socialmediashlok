const mongoose = require('mongoose')
const monogoURI = 'it goes here'

const connectToMongo = ()=>{
    mongoose.connect(monogoURI,()=>{
        console.log("Succesfully connected to Mongo")
    })
}

module.exports = connectToMongo;
