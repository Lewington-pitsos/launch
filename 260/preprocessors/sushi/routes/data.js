var path = require('path');
var fs = require('fs');
var express = require('express');
var router = express.Router();
var dataPath = path.resolve(path.dirname(__dirname), 'public/data/cart.json');

console.log(dataPath);

function writeData() {

}

router.post('/data/cart.json', function(req, res, next) {
  fs.writeFileSync(dataPath, JSON.stringify(req.body, 'UTF8'));
});

router.get('/data/cart', function(req, res, next) {
  res.json(JSON.parse(fs.readFileSync(dataPath, 'utf8')));
});


module.exports = router;
