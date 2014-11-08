var express = require('express');
var DocumentDBClient = require('documentdb').DocumentClient;
var nconf = require = ('nconf');

// tell nconf which config file to use
nconf.env();
nconf.file({ file: 'config.json' });

// From the config file
var host = nconf.get("HOST");
var authKey = nconf.get("AUTH_KEY");
var databaseId = nconf.get("DATABASE");
var collectionId = nconf.get("COLLECTION");

var router = express.Router();

var client = new DocumentDBClient(host, { masterKey: "DCTpmHyuVJMVWMbWMBzaGOGmYlZDV8HmhyTXMXuRSftMyFa3lqlQZfBEI6eGYbNDqeMBRrYXLKX8tlhrdQ4JcQ==" });

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
  res.end("D" + result);
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
  var result = JSON.stringify({
    'success':true,
    'username':username
  });
  readOrCreateDatabase(function (database) {
    result['db'] = database;
    readOrCreateCollection(database, function (collection) {
      result['col'] = collection
      listItems(collection, function (items) {
        //res.render('index', { title: 'My ToDo List', tasks: items });
      });
    });
  });
  res.writeHead(200, {"Content-Type": "application/json"});
  res.end("" + result);
});


module.exports = router;
