var express = require('express');
var router = express.Router();
var {authenticate} = require("../common/auth")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.write("<h1>Don't do it You are going no where</h1>");
});

// /dashboard/data -> return the short urls and longurls along with count for particular user 
router.get('/data',authenticate,async function(){
  // assignment part 
})


module.exports = router;
