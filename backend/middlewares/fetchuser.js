var jwt = require('jsonwebtoken');
const User = require('../modules/User');
const JWT_SECRET = "asdf"

const fetchuser = async(req,res,next)=>{
    const token = req.header('authtoken')
    if(!token){
        res.status(401).json({"error":"Please login using valid token"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET)
        // const user = await User.findOne({'id':data.user.id})
        if(data.user){
            req.user = data.user
        }
        else{
            res.status(401).json({"error":"Please login using valid token"})
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({"error":"Please login using valid token"})
    }
    
    next()
}

module.exports = fetchuser