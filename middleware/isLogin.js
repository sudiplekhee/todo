const JWT = require("jsonwebtoken")
const isLogInOrNot = (req,res, next)=>{
    //receive token
    const token = req.cookies.token

    //verify token
    if(!token){
        res.redirect("/login")
    } else {
        //verify the token
        JWT.verify(token, "secretkey", (error,result)=>{
            if(error){
                res.redirect("/login")
            } else {
                req.userId = result.id
                console.log(result)
                next()
            }
        })
    }
}

module.exports = isLogInOrNot

// exports.isLogInOrNot = (req,res)=>{

//    }