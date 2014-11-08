var express = require('express');
var router = express.Router();

router.get('/login', function(req, res) {
  var username = req.headers;
  res.write({
    'success':true,
    'username':username
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;
