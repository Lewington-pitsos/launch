var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();

var rout_files = ['index', 'albums']

rout_files.forEach(function(name) {
  require(path.resolve(path.dirname(__dirname), `routes/${name}`))(router)
})

module.exports = router;
