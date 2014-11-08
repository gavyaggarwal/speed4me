var express = require('express');
var router = express.Router();

router.get('/login', function(req, res) {
  var username = req.headers;
  var result = JSON.stringify({
    'success':true,
    'username':username
  });
  res.writeHead(200, {"Content-Type": "application/json"});
  res.end(" EG " + result );
});

module.exports = router;
