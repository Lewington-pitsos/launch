var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.get('/', function(req, res, next) {
  var products = fs.readFileSync(path.resolve(path.dirname(__dirname), 'public/products.json'), "UTF8")
  var title = 'Home'
  res.render('index', {
    products: JSON.parse(products)
  });
});

module.exports = router;
