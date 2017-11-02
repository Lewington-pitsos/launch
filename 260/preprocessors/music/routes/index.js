var path = require('path');
var Albums = require(path.resolve(path.dirname(__dirname), 'modules/albums'))

module.exports = function(router) {
  router.get('/', function(req, res, next) {
    var albumsPath = path.resolve(path.dirname(__dirname), 'data/albums.json');
    var albumsData = Albums.get(albumsPath);
    res.render('index', { title: 'Albums', albumsData: albumsData });
  });
}
