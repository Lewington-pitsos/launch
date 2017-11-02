var express = require('express');
var router = express.Router();
var _ = require('underscore');

module.exports = function(app) {
  function setActiveNav(title) {
    var activeItem = _(app.locals.links).findWhere({active: true});
    if (activeItem) {
      activeItem.active = false;
    }

    _(app.locals.links).findWhere({title: title}).active = true;
  }

  router.get('/', function(req, res, next) {
    var title = 'Home'
    setActiveNav(title);
    res.sendFile(__dirname.replace(/routes/, 'views') + '/index.html')
    //res.render('index', {
    //  title: title
    //});
  });

  router.get('/about', function(req, res, next) {
    var title = 'About'
    setActiveNav(title);
    res.render('about', {
      title: title
    });
  });

  return router
}
