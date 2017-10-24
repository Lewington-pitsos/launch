(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['new_person'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id='obscure'>\r\n<form>\r\n  <label>Name: <input type=\"text\" name=\"name\" value=\"\"></label>\r\n  <ul>\r\n    <li><label>colour1: <input type=\"text\" name=\"colour1\" value=\"\"></label></li>\r\n    <li><label>colour2: <input type=\"text\" name=\"colour2\" value=\"\"></label></li>\r\n    <li><label>colour3: <input type=\"text\" name=\"colour3\" value=\"\"></label></li>\r\n  </ul>\r\n  <button type=\"submit\" name=\"button\">submit</button>\r\n</form>\r\n</div>\r\n";
},"useData":true});
})();