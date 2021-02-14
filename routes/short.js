var express = require('express');
const { authenticate } = require('../common/auth');
var router = express.Router();
var {url,mongodClient} = require("../config");
const jwt = require("jsonwebtoken")
var mongodb = require("mongodb")



/* GET home page. */
router.get('/:shorturl', async function(req, res, next) {
    let client;
    try {
        client = await mongodClient.connect(url);
        let db  = client.db("shortener")
        let short = req.params.shorturl
        let data = await db.collection("urls").findOne({short})
        let longurl = data.longURL
        await db.collection("urls").findOneAndUpdate({short},{$inc:{count:1}})
        res.redirect(longurl)
    } catch (error) {
        client.close();
        console.log(error)
    }
});


module.exports = router;