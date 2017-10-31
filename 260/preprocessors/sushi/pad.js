// http://du8ne471zajid.cloudfront.net/projects/websushi/websushi_spa/menu
console.log(Number('67 gfgfggfggf'.match(/.+?\s/)));

function makeObjects(elements) {
  elements.each(function(element) {
    var object = {}
    console.log(this);
    object.id = Number($(this).attr('data-id') - 1);
    object.title = $(this).find('.name').text();
    object.price = Number($(this).find('.price').text().replace('$', ''));
    object.quantity = 1;
    object.imagePath = $(this).find('img').attr('src');
    allObjects.push(object)
  })
}
