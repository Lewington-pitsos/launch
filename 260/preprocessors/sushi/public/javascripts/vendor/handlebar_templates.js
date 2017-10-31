Handlebars = Handlebars || {};
Handlebars.templates = Handlebars.templates || {};

Handlebars.templates['index_item'] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n  <article>\r\n    <header>\r\n      <figure>\r\n        <img src=\""
    + alias4(((helper = (helper = helpers.imagePath || (depth0 != null ? depth0.imagePath : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"imagePath","hash":{},"data":data}) : helper)))
    + "\" alt=\"menu-item\">\r\n      </figure>\r\n      <h2 class=\"name\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>\r\n    </header>\r\n    <p class=\"price\">"
    + alias4(((helper = (helper = helpers.price || (depth0 != null ? depth0.price : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"price","hash":{},"data":data}) : helper)))
    + "</p>\r\n    <footer>\r\n      <a href=\"#\" class=\"add_cart\">Add to cart</a>\r\n    </footer>\r\n  </article>\r\n</li>\r\n";
},"useData":true});

Handlebars.partials = Handlebars.templates

