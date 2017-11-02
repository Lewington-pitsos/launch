this["JST"] = this["JST"] || {};

this["JST"]["cart_item"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><figure><img src=\""
    + alias4(((helper = (helper = helpers.imagePath || (depth0 != null ? depth0.imagePath : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"imagePath","hash":{},"data":data}) : helper)))
    + "\" alt=\"cart-item\"></figure><p>"
    + alias4(((helper = (helper = helpers.quantity || (depth0 != null ? depth0.quantity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data}) : helper)))
    + " x $"
    + alias4((helpers.format_price || (depth0 && depth0.format_price) || alias2).call(alias1,(depth0 != null ? depth0.price : depth0),{"name":"format_price","hash":{},"data":data}))
    + "</p></li>";
},"useData":true});

this["JST"]["checkout_item"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><td><img src=\""
    + alias4(((helper = (helper = helpers.imagePath || (depth0 != null ? depth0.imagePath : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"imagePath","hash":{},"data":data}) : helper)))
    + "\" alt=\"cart-item\"></td><td>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</td><td><span class=\"quantity_modifier\"><i class=\"fa fa-minus\" aria-hidden=\"true\"></i></span><p>"
    + alias4(((helper = (helper = helpers.quantity || (depth0 != null ? depth0.quantity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data}) : helper)))
    + "</p><span class=\"quantity_modifier\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></span></td><td class=\"total_price\">$"
    + alias4((helpers.aggregate_price || (depth0 && depth0.aggregate_price) || alias2).call(alias1,(depth0 != null ? depth0.price : depth0),(depth0 != null ? depth0.quantity : depth0),{"name":"aggregate_price","hash":{},"data":data}))
    + "</td></tr>";
},"useData":true});

this["JST"]["checkout"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"checkout\"><div class=\"img_top\"></div><section><h1>Order Details</h1><table><thead><tr><th>Item</th><th></th><th>Quantity</th><th>Price</th></tr></thead><tbody></tbody></table><p>Total: <span class=\"total\">$"
    + container.escapeExpression((helpers.format_price || (depth0 && depth0.format_price) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.total : depth0),{"name":"format_price","hash":{},"data":data}))
    + "</span></p><footer class='checkout_footer'><a href=\"/\">Cancel order</a><form action=\"/\" method=\"post\"><input type=\"submit\" value=\"ORDER NOW!\"></form></footer></section><div class=\"img_bottom\"></div></div>";
},"useData":true});

this["JST"]["dish_info"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"item_details\"></div>";
},"useData":true});

this["JST"]["index_item"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><article><header><figure><img src=\""
    + alias4(((helper = (helper = helpers.imagePath || (depth0 != null ? depth0.imagePath : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"imagePath","hash":{},"data":data}) : helper)))
    + "\" alt=\"menu-item\"></figure><h2 class=\"name\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h2></header><p class=\"price\">$"
    + alias4((helpers.format_price || (depth0 && depth0.format_price) || alias2).call(alias1,(depth0 != null ? depth0.price : depth0),{"name":"format_price","hash":{},"data":data}))
    + "</p><footer><a href=\"#\" class=\"add_cart\">Add to cart</a></footer></article></li>";
},"useData":true});

this["JST"]["single_dish_info"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<table><tbody><tr><td>Protein</td><td>"
    + alias4(((helper = (helper = helpers.protein || (depth0 != null ? depth0.protein : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"protein","hash":{},"data":data}) : helper)))
    + "</td></tr><tr><td>Fat (total)</td><td>"
    + alias4(((helper = (helper = helpers.fat || (depth0 != null ? depth0.fat : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fat","hash":{},"data":data}) : helper)))
    + "</td></tr><tr><td>Carbohydrate</td><td>"
    + alias4(((helper = (helper = helpers.carbohydrates || (depth0 != null ? depth0.carbohydrates : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"carbohydrates","hash":{},"data":data}) : helper)))
    + "</td></tr><tr><td>Energy (kj)</td><td>"
    + alias4(((helper = (helper = helpers.energy_kj || (depth0 != null ? depth0.energy_kj : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"energy_kj","hash":{},"data":data}) : helper)))
    + "</td></tr><tr><td>Energy (kcal)</td><td>"
    + alias4(((helper = (helper = helpers.energy_kcal || (depth0 != null ? depth0.energy_kcal : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"energy_kcal","hash":{},"data":data}) : helper)))
    + "</td></tr><tr><td>Sugar</td><td>"
    + alias4(((helper = (helper = helpers.suger || (depth0 != null ? depth0.suger : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"suger","hash":{},"data":data}) : helper)))
    + "</td></tr></tbody></table>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"section\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><div class=\"nav prev\"><img src=\"/images/nav-prev.png\" alt=\"prev\"></div><figure><img src=\""
    + alias4(((helper = (helper = helpers.imagePath || (depth0 != null ? depth0.imagePath : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"imagePath","hash":{},"data":data}) : helper)))
    + "\" alt=\"selected-item\"></figure><article><a class=\"close\" href=\"/\">+</a><h1>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1><p>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p><footer><h2>$"
    + alias4((helpers.format_price || (depth0 && depth0.format_price) || alias2).call(alias1,(depth0 != null ? depth0.price : depth0),{"name":"format_price","hash":{},"data":data}))
    + "</h2><a class=\"add_cart\" href=\"#\">Add to cart</a></footer></article><aside><h3>Nutritional Information</h3>"
    + ((stack1 = helpers["with"].call(alias1,(depth0 != null ? depth0.nutrition : depth0),{"name":"with","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</aside><div class=\"nav next\"><img src=\"/images/nav-next.png\" alt=\"next\"></div></div>";
},"useData":true});