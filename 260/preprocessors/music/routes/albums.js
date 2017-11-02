var path = require('path');
var _ = require('underscore');
var Albums = require(path.resolve(path.dirname(__dirname), 'modules/albums'))


module.exports = function(router) {
  router.route('/albums').get(function(req, res, next) {
    res.json(Albums.get());
  }).post(function(req, res, next) {
    var album = req.body;
    var albums = Albums.get();

    album.id = Albums.getLastId();
    albums.push(album);
    Albums.set({last_id: album.id, data: albums});
    res.json(album)
  }).delete(function(req, res, next) {
    var albums = _(Albums.get()).reject(function(a) {
      return a.id === req.body.id
    });

    Albums.set({last_id: Albums.getLastId(), data: albums});
    res.json(albums);
  }).put(function(req, res, next) {
    var albums = Albums.get();
    var target = _(albums).findWhere({id: req.body.id});
    _.extend(target, req.body);
    Albums.set({last_id: Albums.getLastId(), data: albums});
    res.json(target);
  })

  router.get('/albums/new', function(req, res, next) {
    res.render('new', {
      albums: Albums.get()
    })
  });
}
