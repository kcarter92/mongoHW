$.getJSON('/articles', function(data) {
  // for each one
  for (var i = 0; i<data.length; i++){
    // display the apropos information on the page
    $('#articles').append('<div class="col m12 m6">' + '<div class="card blue-grey darken-1">'  + data[i].title + '<br />'+ data[i].link + '</br>' + '<button id="noteBtn" type="submit" data-target="modal1" class="waves-effect waves-light btn teal lighten-1" data-id="' + data[i]._id + '">' + 'Add Note' + '</button>'+'</div>' + '</div>');
  }
});
// '<div class="card-action">' + '<p id="name">' + '</p>' + ' <p id="comm">' + '</p>' + '</div>'+ 
// whenever someone clicks a p tag
$(document).on('click', '#noteBtn', function(){
  // empty the notes from the note section
  $('.modal-content').empty();
  $('.modal-footer').empty();
  // save the id from the p tag
  var thisId = $(this).attr('data-id');

  // now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId,
  })
    // with that done, add the note information to the page
    .done(function( data ) {
      console.log(data);
      // the title of the article
      $('.modal-content').append('<h4>' + "Type your note" + '</h4>'); 
      // an input to enter a new title
      $('.modal-content').append('<input placeholder="Type your name" id="first_name" type="text" class="validate">'); 
      // a textarea to add a new note body
      $('.modal-content').append('<textarea id="bodyinput" name="body"></textarea>');
      // a button to submit a new note, with the id of the article saved to it
      $('.modal-footer').append('<button class=" modal-action modal-close waves-effect waves-green btn-flat" data-id="' + data._id + '" id="savenote">Save note</button>');

      // $('#first_name').val("")
      // $('#bodyinput').val("")

      $('.modal').modal();
      // if there's a note in the article
      if(data.note){
        // place the title of the note in the title input
        $('#first_name').val(data.note.title);
        $('#bodyinput').val(data.note.body);
        // $('#first_name').val(data.note.title);
        // place the body of the note in the body textarea
        // $('#bodyinput').val(data.note.body);
      }
    });
});

// when you click the savenote button
$(document).on('click', '#savenote', function(){
  // grab the id associated with the article from the submit button
  var thisId = $(this).attr('data-id');

  console.log($('#first_name').val());
  console.log($('#bodyinput').val());

  // run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $('#first_name').val(), // value taken from title input
      body: $('#bodyinput').val() // value taken from note textarea
    }
  })
    // with that done
    .done(function( data ) {
      // log the response
      console.log(data);
      // empty the notes section
      $('#first_name').val("");
      $('#bodyinput').val("");
      // $('.modal-content').empty();
      // $('.modal-footer').empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $('#first_name').val("");
  $('#bodyinput').val("");
});