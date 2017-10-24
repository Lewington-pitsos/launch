var PostModel = Backbone.Model.extend({
  urlRoot: "http://jsonplaceholder.typicode.com/posts",
  setUser: function() {
    var userId = this.get('userId')
    console.log(userId);
    var user = new UserModal({
      id: userId
    });

    var currentModal = this
    user.fetch({success: function() {
      currentModal.set('user', user)
    }});
  },
  initialize: function() {
    this.has("userId") && this.setUser();
    this.on('change:userId', this.setUser)
  }
});

var post2 = new PostModel({
    id: 2
});

var post1 = new PostModel({
    id: 1
});

post1.toJSON()

post1.fetch({success: function() {
  return post1.attributes;
}});

var UserModal = Backbone.Model.extend({
  urlRoot: "http://jsonplaceholder.typicode.com/users"
});

var user1 = new UserModal({
  id: post1.get('userId')
});

user1.fetch({success: function() {
  return post1.attributes;
}});

post3 = new PostModel({
  id: 6,
  title: 'why even bother?',
  body: 'who even knows?',
  userId: 2
});

var postTemplate = $('#post').html()
var $body = $('body')

function renderPost(modal) {
  $post = $(postTemplate)

  $heading = $post.find('h1');
  $heading.text(modal.get('title'));



  $body.append($post);
}

$user = $post.find('header p');
$user.text(modal.get('user').get('id'));

$body = $post.find('article > p');
$body.text(modal.get('body'));
