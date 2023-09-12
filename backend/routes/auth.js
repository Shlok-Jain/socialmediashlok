const express = require('express')
const router = express.Router()
const User = require('../modules/User')
const jwt = require('jsonwebtoken');
const JWT_SECRET = "asdf"
const fetchuser = require('../middlewares/fetchuser')

//POST: /signup
router.post('/signup',async(req,res)=>{
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const {name,email,phone,password} = req.body;
    if(name.length<2){
        return res.json({'error':'Name must be atleast 2 characters'})
    }
    else if(name.split(' ').length !=1){
        return res.json({'error':'Name must not contain spaces'})
    }
    else if((await User.find({"name":name.toLowerCase()})).length !=0){
        return res.json({'error':'This username is already taken.'})
    }
    else if(!email.match(mailformat)){
        return res.json({'error':'Invalid email'})
    }
    else if(phone.length!==10){
        return res.json({'error':'Invalid phone number'})
    }
    else if(password.length<5){
        return res.json({'error':'Password must be atleast 5 characters'})
    }
    else if((await User.find({"email":email})).length !=0){
        return res.json({'error':'This email is already taken.'})
    }
    else{
        const user = await User.create({'name':name.toLowerCase(),email,phone,password})
        const data = {user:{id: user.id}}
        const authtoken = jwt.sign(data,JWT_SECRET)
        return res.json({'success':true,'authtoken':authtoken})
    }
})

//POST : /login
router.post('/login',async(req,res)=>{
    const {name,password} = req.body;
    const search = await User.find({"name":name.toLowerCase()})
    if(search.length==0){
        return res.json({'error':'No such username found'})
    }
    else{
        if(search[0].password == password){
            const data = {user:{id: search[0].id}}
            const authtoken = jwt.sign(data,JWT_SECRET)
            return res.json({'success':true,'authtoken':authtoken})
        }
        else{
            return res.json({'error':'Incorrect password'})
        }
    }
})

//POST : /fetchuser
router.post('/fetchuser',fetchuser,async (req,res)=>{
    try {
        const userid = req.user.id
        const user = await User.findById(userid).select("-password")
        return res.json({'user':user,'success':true})
    }
    catch(error){
        res.status(500).json({error:"Some error occured"})
    }
    // return res.json({'user':req.user,'success':true})
})


module.exports = router;