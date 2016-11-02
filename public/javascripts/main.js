// grab the articles as a json
$.getJSON('/articles', function(data) {
    // for each one
    for (var i = 0; i < data.length; i++) {
        // display the apropos information on the page
        $('.articles').append('<div class="well"><div class="media">' +
            '<div class="media-left media-middle">' +
            '<i class="fa fa-sticky-note fa-3x" aria-hidden="true" data-id="' + data[i]._id + '"></i>' + '</div>' + '<div class="media-body">' + '<h4 class="media-heading">' + data[i].title + '</h4><a href="' + data[i].link + '" target="_blank">' + data[i].link + '</a></div>' + '</div>' + '</div>');
    }
});

// whenever someone clicks a p tag
$(document).on('click', 'i', function() {
    // empty the notes from the note section
    $('.notes').empty();
    // save the id from the p tag
    var thisId = $(this).attr('data-id');

    // now make an ajax call for the Article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
    // with that done, add the note information to the page
        .done(function(data) {
        console.log(data);
        // the title of the article
        $('.notes').append('<h2>' + data.title + '</h2><form><div class="form-group"><input id="titleinput" class="form-control" name="title" placeholder="Note title"><textarea id="bodyinput" class="form-control" rows="5" name="body" placeholder="Enter your note here..."></textarea></div><button type="submit" class="btn btn-default" data-id="' + data._id + '" id="savenote">Save Note</button></form>');

        // if there's a note in the article
        if (data.note) {
            // place the title of the note in the title input
            $('#titleinput').val(data.note.title);
            // place the body of the note in the body textarea
            $('#bodyinput').val(data.note.body);
        }
    });
});

// when you click the savenote button
$(document).on('click', '#savenote', function() {
    // grab the id associated with the article from the submit button
    var thisId = $(this).attr('data-id');

    // run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $('#titleinput').val(), // value taken from title input
            body: $('#bodyinput').val() // value taken from note textarea
        }
    })
    // with that done
        .done(function(data) {
        // log the response
        console.log(data);
        // empty the notes section
        $('.notes').empty();
    });

    // Also, remove the values entered in the input and textarea for note entry
    $('#titleinput').val("");
    $('#bodyinput').val("");
});
