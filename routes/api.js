var express = require('express');
var DocumentDBClient = require('documentdb').DocumentClient;
var nconf = require('nconf');

// tell nconf which config file to use
nconf.env();
nconf.file({ file: 'config.json' });

// From the config file
var host = nconf.get("HOST");
var authKey = nconf.get("AUTH_KEY");
var databaseId = nconf.get("DATABASE");
var collectionId = nconf.get("COLLECTION");

var router = express.Router();

var client = new DocumentDBClient(host, { masterKey: authKey });

router.get('/login', function(req, res) {
  /* Request header:
    { username: <username> }
  Response:
    {
      'success': true,
      'username': <username>
    }
  */

  var username = req.headers["username"];
  var result = JSON.stringify({
    'success':true,
    'username':username
  });
  res.writeHead(200, {"Content-Type": "application/json"});
  res.end(result);
});

router.get('/getDrops', function(req, res) {
  /* Request header:
    { username: <username> }
  Response:
    {
      'success': true,
      'username': <username>
    }
  */

  var username = req.headers["username"];
  var result = JSON.stringify([
    {
      id:123,
      seller:'dope_peddler',
      geocachetag:'234o8sdfalj',
      images:'http://imgur.com/gallery/JxhmTIR',
      description:'i <3 dope'
    },
    {
      id:300,
      seller:'stoner_boi',
      geocachetag:'fwehoi234oysd',
      images:'http://imgur.com/gallery/BL6Vs',
      description:'i love 2 smoke'
    }
    ]);

  if(!username) {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end("Invalid Authentication (rob, if you see this, ask gavy)");
  } else {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(result);
  }
});

module.exports = router;
