var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/user', function(req, res) {
  // Get real data from database here.


  // Making fake JSON object in the mean time.


  res.render('user', { name: '' });
});

module.exports = router;
