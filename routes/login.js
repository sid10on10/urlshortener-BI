var express = require('express');
var router = express.Router();
var {url,mongodClient} = require("../config")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.write("<h1>Use Post Method to Login</h1>");
});

// login post method
// JWT tokens for login
router.post("/",async function(req,res,next){
    let client;
    try {
        client  = await mongodClient.connect(url)
        let db = client.db("shortener")
        let {email,password} = req.body
        let user = await db.collection("users").findOne({email:email})
        console.log(user)
        if(user){
            // compare the password
            let result = await bcryptjs.compare(password,user.password)
            if(result){
                let token = jwt.sign({id:user._id},"abcdefghijkl")
                res.json({
                    message:"Login Successfull Token Generated",
                    token
                })
            }else{
                res.json({
                    message:"Password Invalid"
                })
            }
        }else{
            res.json({
                message:"No User found with this email"
            })
        }
    } catch (error) {
        client.close()
        console.log(error)
    }
})

module.exports = router;