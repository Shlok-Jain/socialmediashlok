const express = require('express');
const fetchuser = require('../middlewares/fetchuser');
const router = express.Router()
const User = require('../modules/User')
const path = require('path');
const config = require('../config.json');

//POST : /profile_pic
router.post('/profile_pic',fetchuser,async(req,res)=>{
    if(req.user){
        if(req.files){
        const file = req.files.file
        if(req.user){
            try{
                const new_file_extension = path.extname(file.name).toLowerCase()
                let imgList = ['.png','.jpg','.jpeg','.gif'];
                if(file.size > 1048576){
                    return res.json({'error':"File is too Large"});
                }
                else if(!imgList.includes(new_file_extension)){
                    return res.json({'error':'only png, jpg, jpeg amd gif files allowed'})
                }
                else{
                    const new_file_name = req.user.id + new_file_extension
                    await User.findByIdAndUpdate(req.user.id,{"profile_pic":`${config.host_server}/profile_pics/${new_file_name}`})
                    file.mv(path.join(__dirname,'../static/profile_pics',new_file_name))
                    return res.json({'success':true})
                }
            }
            catch(e){
                res.json({'error':'somethong went wrong'})
            }
        }
        else{
            res.json({'error':'somethong went wrong'})
        }
    }
    else{
        return res.json({'error':'No files selected'})
    }
    }
    
})

router.post('/name',fetchuser,async(req,res)=>{
    try{
        if(req.user){
        const {name} = req.body;
        if(name.length<2){
            return res.json({'error':'Name must be atleast 2 characters'})
        }
        else if(name.split(' ').length !=1){
            return res.json({'error':'Name must not contain spaces'})
        }
        else if((await User.find({"name":name})).length !=0){
            return res.json({'error':'This username is already taken'})
        }
        else{
            await User.findByIdAndUpdate(req.user.id,{'name':name})
            return res.json({'success':true})
        }
    }
    else{
        return res.json({"error":"login to your account to continue"})
    }
    }
    catch(e){
        res.json({'error':'somethong went wrong'})
    }
})

module.exports = router;