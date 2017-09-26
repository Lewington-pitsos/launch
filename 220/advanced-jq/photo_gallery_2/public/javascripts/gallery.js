$(function() {
  var photosJson;
  var currentPhotoId = 1;

  function nextId(currentId) {
    return currentId >= photosJson.length ? 1 : currentId + 1;
  }

  function prevId(currentId) {
    return currentId <= 1 ? 3 : currentId - 1;
  }

  var snippitPhotos = $('#photos').text();
  var templatePhotos = Handlebars.compile(snippitPhotos);

  var snippitPhotoInfo = $('#photo_information').text();
  var templatePhotoInfo = Handlebars.compile(snippitPhotoInfo);

  var snippitComments = $('#comments-template').text();
  Handlebars.registerPartial('comment', $('#comment').text());
  var templateComments = Handlebars.compile(snippitComments);

  $('.prev').click(function(e) {
    e.preventDefault();


  })

  $('#slideshow ul').click(function(e) {
    e.preventDefault();
    if ($(e.target).hasClass('prev')) {
      currentPhotoId = prevId(currentPhotoId);
    } else {
      currentPhotoId = nextId(currentPhotoId);
    }
    renderCurrentPhoto(photosJson, currentPhotoId);
    bufferSlides(currentPhotoId);
    getCommentsFor(currentPhotoId);
  })

  $('header').click(function(e) {
    e.preventDefault();
    var text;
    var url;
    if ($(e.target).hasClass('like')) {
      text = 'Likes'
      url = '/photos/like'
    } else {
      text = 'Favorites'
      url = '/photos/favorite'
    }

    $.ajax({
      url: url,
      data: `photo_id=${currentPhotoId}`,
      type: 'POST',
      dataType: 'json',
      success: function(json) {
        var newTotal = json.total;
        $(e.target).text(`${newTotal} ${text}`);
        photosJson[currentPhotoId - 1][text.toLowerCase()] = newTotal;
      }
    });
  })

  $('form').submit(function(e) {
    e.preventDefault();
    var formattedData = $(this).serialize();
    formattedData = formattedData.replace('=1&', `=${currentPhotoId}&`);
    console.log(formattedData);
    $.ajax({
      url: '/comments/new',
      data: formattedData,
      type: 'POST',
      dataType: 'json',
      success: function(json) {
        getCommentsFor(currentPhotoId, json);
        $('dd').children().val('');
      }
    })
  })

  $.ajax({
    url: '/photos',
    type: 'GET',
    dataType: 'json',
    success: function(photos) {
      loadPhotos(photos);

      renderCurrentPhoto(photos, currentPhotoId);

      getCommentsFor(currentPhotoId)
    }
  });

  function bufferSlides(currentId) {
    var duration = 400;
    var currentPhoto = $(`figure[data-id="${currentId}"]`);
    currentPhoto.siblings().animate({
      opacity: "0"
    }, duration);
    currentPhoto.animate({
      opacity: "1"
    }, duration);
  }

  function loadPhotos(photos) {
    var formattedJson = photos.forEach(function(element, index) {
      element['id'] = index + 1;
    })
    var finalPhotos = templatePhotos({photos: photos});
    $('#slides').append(finalPhotos);
    photosJson = photos;
  }

  function renderCurrentPhoto(allPhotos, photoIndex) {
    var finalPhotoInfo = templatePhotoInfo(allPhotos[photoIndex - 1]);

    $('section > header').html(finalPhotoInfo);
  }

  function getCommentsFor(currentId, currentComment='') {
    $.ajax({
      url: '/comments',
      data: `photo_id=${currentId}`,
      type: 'GET',
      dataType: 'json',
      success: function(json) {
        if (currentComment) {
          json.push(currentComment);
        }
        var finalComments = templateComments({comments: json});
        $('#comments ul').html(finalComments);
      }
    })
  }

});
