var express = require('express');
var DocumentDBClient = require('documentdb').DocumentClient;
var nconf = require('nconf');
try {
  var sql = require('msnodesql');
}
catch (e) {
  console.log(e);
}

nconf.env();
nconf.file({ file: 'config.json' });
var conn = nconf.get("SQL_CONN");

var router = express.Router();

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

router.post('/getDrops', function(req, res) { 
  var username = req.body.username;

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

  console.log("flag 1");
  if(!username) {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end("Invalid Authentication (rob, if you see this, ask gavy)");
  } else {
    try {
      console.log("flag 2");
      var select = "select * from drops";
      sql.query(conn, select, function(err, items) {
          if(err)
              throw err;
          console.log("flag 3");
          res.writeHead(200, {"Content-Type": "application/json"});
          console.log("aiya");
          res.end(JSON.stringify(items));
      });
    } catch(e) { console.log("Error"); console.log(e); }
  }
});

module.exports = router;
