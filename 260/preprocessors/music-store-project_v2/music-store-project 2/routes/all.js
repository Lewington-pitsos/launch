var fs = require('fs');
var path = require('path');
var express = require('express');

var router = express.Router();
var routeFiles = ['index', 'albums'];

var albumsFilePath = path.resolve(path.dirname(__dirname), 'data/albums.json');
var albumsApi = Object
    .create(require(path.resolve(path.dirname(__dirname), 'api/JSON-crud.js')))
    .init(albumsFilePath);

routeFiles.forEach(function(route) {
  require(path.resolve(path.dirname(__dirname), `routes/${route}`))(router, albumsApi);
});

module.exports = router;
