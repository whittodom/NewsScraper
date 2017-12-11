$(document).ready(function() {

  var articlesDiv = $('#articles');

  // setUp();

  //FUNCTION - set up article container
  // function setUp() {
  //   articlesDiv.empty();
  //   app.get("/articles", function(data) {
  //     console.log(data);

  //     if (data.length) {
  //       render(data);
  //     }
  //     else {
  //       console.log('No articles in database...');
  //     }
  //   });
  // };

  // function setUp() {
  //   articlesDiv.empty();
  //   $.getJSON("/articles", function(data) {

  //     if (data.length) {
  //       // render(data);
  //       // res.json(data);
  //     }
  //     else {
  //       console.log('No articles in database...');
  //     }
  //   });
  // };

  //FUNCTION - render articles
  // function render(articles) {
  //   var articlesArray = [];

  //   for (var i = 0; i < articles.length; i++) {
  //     articlesArray.push(createCard(articles[i]));
  //   }
  //   articlesDiv.append(articlesArray);
  // };

  //FUNCTION - create HTML for articles
  // function createCard(data) {    
  //   // Display the apropos information on the page
  //   var card = $(
  //     [
  //       "<div class='card'>", 
  //       "<div class='card-header'>",
  //       "<h4>" +
  //       "<a class='article-link' target='_blank' href='",
  //       data.link,
  //       "'>",
  //       data.title,
  //       "</a>",
  //       "</h4>",
  //       "<a id='btn-comments' class='btn btn-success save'> Comments </a>",
  //       "<div class='card-body'",
  //       "<h4 class='card-title'>",
  //       data.body,
  //       "</h4>",
  //       "</div>",    
  //       "</div>"
  //     ].join("") 
  //   );
    
  //   card.data("_id", data._id);
  //   return card;  
  // }; 

//FUNCTION - handle comments

//LISTENERS
  //to comment on articles
  $(document).on("click", "h4", function() {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .done(function(data) {
        console.log(data);
        // The title of the article
        $("#notes").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        $("#notes").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });  


  // When you click the savenote button
  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .done(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });

});