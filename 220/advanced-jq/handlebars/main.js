var tags = ['#fun', '#cool', '#deadly', '#ggg'];



$(function() {
  Handlebars.registerPartial('tagHolder', $('#tag').text())
  console.log($('tag').text());
  var post = {
    title: 'Lorem ipsum dolor sit amet',
    published: 'April 1, 2015',
    body: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et <span></span>quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>',
    tags: ['#fun', '#cool', '#deadly', '#ggg']
  };

  var posts = new Array(10).fill(post);
  posts.unshift({title: 'Lorem ipsum dolor sit amet',
  published: 'April 1, 2019',
  body: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et <span></span>quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>'});
  var snippit = $('#post').text();
  var template = Handlebars.compile(snippit);
  var final = template({posts});
  $('body').append(final);
})
