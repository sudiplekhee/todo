const JWT = require("jsonwebtoken")
const isLogInOrNot = (req,res)=>{
    //receive token
    const token = req.cookies.token

    //verify token
    if(!token){
        res.send("Please login")
    } else {
        //verify the token
        JWT.verify(token, "secretkey", (error,result)=>{
            if(error){
                res.send("invalid tokon")
            } else {
                res.send('valid token, verified')
            }
        })
    }
}

module.exports = isLogInOrNot

// exports.isLogInOrNot = (req,res)=>{

//    }