var express = require('express');
var router = express.Router();
var {url,mongodClient} = require("../config")
const bcryptjs = require("bcryptjs")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.write("<h1>Don't use GET Method use POST to register</h1>");
});

// Register Logic

// we will not store the actual password in the database
// hash the password and save it in database bcrypt js
router.post('/', async function(req,res,next){
    let client;
    try {
        client = await mongodClient.connect(url);
        let db  = client.db("shortener")
        let {email,password} = req.body
        let user = await db.collection("users").findOne({email:email}); // find gives cursor object
        if(user){
            // stop him to register
            res.json({
                message:"User already registered Kindly login"
            })
        }else{
            // let him register
            let salt = await bcryptjs.genSalt(10);
            let hash = await bcryptjs.hash(password,salt)
            password = hash
            await db.collection("users").insertOne({
                email,
                password
            })
            res.json({
                message:"Registration successfull you can now login"
            })
        }
    } catch (error) {
        client.close();
        console.log(error)
    }
})

module.exports = router;