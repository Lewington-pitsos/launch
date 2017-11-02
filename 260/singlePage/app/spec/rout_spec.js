var request = require('request');
var root = 'http://localhost:3333/';
var albums;

describe('JSON routs', function() {
  describe('/albums.json', function() {
    it('returns an array of albums', function(done) {
      request(root + "albums.json", function(error, response, body) {
        expect(body).toBeTruthy();
        if (body) {
          albums = JSON.parse(body);
          expect(albums[0].artist).toBeDefined();
        }
        done();
      })
    })
  })

  describe('/albums/<album>.json', function() {
    it('returns array of tracks', function(done) {
      request(`${root}albums/${albums[0].title}.json`, function(e, res, body) {
        expect(JSON.parse(body)[0].title).toBeDefined();
        done();
      })
    })
  })

})
