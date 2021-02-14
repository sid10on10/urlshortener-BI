// if you hit a protected route it has to check for token
// req -> middleware -> req back to the certain endpoint
// req from client -> middleware checks for tests or logic -> pass it to that view or api endpoint

var jwt = require("jsonwebtoken")

var authenticate = function(req,res,next){
    if(req.headers.authorization){
        jwt.verify(req.headers.authorization,"abcdefghijkl",function(err,decode){
            if(err){
                res.json({message:"Token not valid"})
            }
            next();
        })
    }else{
        res.json({message:"Token not present"})
    }
}

module.exports = {authenticate}