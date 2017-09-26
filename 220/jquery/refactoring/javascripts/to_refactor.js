$(function() {
  $("nav a").on("mouseenter", function() {
    $(this).next("ul").toggleClass('opened');
  });

  $("nav").on("mouseleave", function() {
    $(this).find("ul ul").toggleClass('opened');
  });

  $(document).on("click", function(e) {
    if ($(e.target).prop('tagName') === 'BUTTON' ||
                  $(e.target).hasClass('button')) {
      e.preventDefault();
      $(e.target).addClass("clicked");
    }

    if ($(e.target).hasClass('toggle')) {
      e.preventDefault();
      $(e.target).next(".accordion").toggleClass("opened");
    }
  });


function checkNum(cc_number) {
  var odd_total = 0;
  var even_total = 0;

  cc_number = cc_number.split("").reverse();
    for (var i = 0, len = cc_number.length; i < len; i++) {
    if (i % 2 == 1) {
      cc_number[i] = (+cc_number[i] * 2) + "";
      if (cc_number[i].length > 1) {
        cc_number[i] = +cc_number[i][0] + +cc_number[i][1];
      }
      else {
        cc_number[i] = +cc_number[i];
      }
      odd_total += cc_number[i];
    }
    else {
      even_total += +cc_number[i];
    }
  }

  return odd_total + even_total;
}


  $("form").on("submit", function(e) {
    e.preventDefault();
    var cc_number = $(this).find("[type=text]").val();
    var result = checkNum(cc_number);

    if ((result) % 10 == 0) {
      $(this).find(".success").show();
      $(this).find(".error").hide();
    }
    else {
      $(this).find(".error").show();
      $(this).find(".success").hide();
    }
  });

  $("ul a").on("click", function(e) {
    e.preventDefault();

    var month = $(this).text(),
        $stone = $("#birthstone");
    var monthStones = {
      "January": "Your birthstone is garnet",
      "February": "Your birthstone is amethyst",
      "March": "Your birthstone is aquamarine or bloodstone",
      "April": "Your birthstone is diamond",
      "May": "Your birthstone is emerald",
      "June": "Your birthstone is pearl, moonstone, or alexandrite",
      "July": "Your birthstone is ruby",
      "August": "Your birthstone is peridot",
      "September": "Your birthstone is sapphire",
      "October": "Your birthstone is opal or tourmaline",
      "November": "Your birthstone is topaz or citrine",
      "December": "Your birthstone is turquoise, zircon, or tanzanite"
    }
    $stone.text(monthStones[month]);

  });
});
