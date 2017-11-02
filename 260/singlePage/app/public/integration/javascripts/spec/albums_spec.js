describe('Albums collection', function() {

  it('fetches from server properly', function(done) {
    var albumsLoaded = app.albumsLoaded;
    app.albumsLoaded = function() {
      albumsLoaded.apply(app, arguments);
      expect(app.albums.models.length).toBe(3);
      expect(typeof app.albums.models[0].attributes.title).toBe('string');
      done();
    }

    app.init();
  })

  it('sets a tracks url property on model creation', function() {
    app.albumsLoaded = function() {
      expect(app.albums.first().get('tracks_url')).toMatch(/^\/album/);
      done();
    }

    app.init();
  })
})
