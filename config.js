var mongodb = require("mongodb");
var mongodClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017";

module.exports = {url,mongodClient};