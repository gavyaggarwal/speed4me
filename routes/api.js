var express = require('express');
var DocumentDBClient = require('documentdb').DocumentClient;
var nconf = require('nconf');
try {
  var sql = require('msnodesql');
}
catch (e) {

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

router.get('/getDrops', function(req, res) {
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

  res.writeHead(200, {"Content-Type": "application/json"});
  res.end(JSON.stringify(results));

  if(!username) {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end("Invalid Authentication (rob, if you see this, ask gavy)");
  } else {
    try {
      var select = "select * from drops";  //Where buyer=id or seller=id
      sql.query(conn, select, function(err, items) {
          if(err)
              throw err;
          res.writeHead(200, {"Content-Type": "application/json"});
          res.end(JSON.stringify(items));
      });
    } catch(e) {}
  }
});

router.get('/addDrop', function(req, res) {
  var username = req.headers["username"];
  var geoid = req.headers["geoid"];
  var image = req.headers["image"];
  var seller = req.headers["seller"];
  var buyer = req.headers["buyer"];
  var desc = req.headers["description"];

  var result = JSON.stringify({
    success:true
  });

  res.writeHead(200, {"Content-Type": "application/json"});
  res.end(JSON.stringify(results));

  if(!username) {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end("Invalid Authentication (rob, if you see this, ask gavy)");
  } else {
    try {
      var select = "select dropid from drops ORDER BY dropid DESC LIMIT 1";
      sql.query(conn, select, function(err, items) {
          if(err)
              throw err;
          var dropid = parseInt(items[0]);
          dropid++;

          var insert = "INSERT INTO drops VALUES (?, ?, ?, ?, ?, ?)";
          sql.query(conn, insert, [dropid, geoid, image, seller, buyer, desc], function(err) {
            if(err)
                throw err;
        });
          res.writeHead(200, {"Content-Type": "application/json"});
          res.end(JSON.stringify(items));
      });
    } catch(e) {}
  }
});

router.get('/getUser', function(req, res) {
  var userid = req.headers["id"];
  var result = JSON.stringify({
      id:userid,
      username:'stoner_boi'
    });

  res.writeHead(200, {"Content-Type": "application/json"});
  res.end(JSON.stringify(results));

  if(!username) {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end("Invalid Authentication (rob, if you see this, ask gavy)");
  } else {
    try {
      var select = "select * from users WHERE userid=" + userid + " LIMIT 1";  //Where buyer=id or seller=id
      sql.query(conn, select, function(err, items) {
          if(err)
              throw err;
          res.writeHead(200, {"Content-Type": "application/json"});
          res.end(JSON.stringify(items));
      });
    } catch(e) {}
  }
});

module.exports = router;
