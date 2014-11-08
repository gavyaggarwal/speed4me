var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var username = req.headers;
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end({
    'success':true,
    'username':username
  });
  //res.render('index', { title: 'Express' });
});

module.exports = router;
