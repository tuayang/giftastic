

    // array of starter animals for buttons

    var animals = ["Dog", "Cat", "Horse", "Rat", "Elephant", "Zebra", "Lion", "Shark", "Eagle"];


    // function to display contents from API

    function displayInfo() {
        var animal = $(this).attr("anim-type");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=NENyRd4WsuYHWvVIW00Shb0dvG4FTFGr&limit=10";

    // AJAX to GET info

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {

        $("#Gifs").empty();

        var results = response.data;

    // for loop to grab contents of button clicked 

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='gifList'>");

        // variable container for still and animated URL

        var urlStill = results[i].images.fixed_height_still.url;
        var urlPlay = results[i].images.fixed_height.url;

        // variable container for gif 

        var gif = $("<img>").addClass("gif").attr("src", urlStill).attr("data-still", urlStill).attr("data-animate", urlPlay).attr("data-state", "still");

        // append the gif Gif <div> 

        gifDiv.append(gif);

        $("#Gifs").append(gifDiv);
    }

        // function to pause and animate when clicked

        $(".gif").on("click", function() {
            var state = $(this).attr("data-state");

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }

        });
    });

    }

    // render function to create a button from array

    function renderButtons() {

        $("#animButtons").empty();

        for (var i = 0; i < animals.length; i++) {

            var animalRender = $("<button>");

    // add class and attribute of animal input

            animalRender.addClass("animal");
            animalRender.attr("anim-type", animals[i]);
            animalRender.text(animals[i]);
            $("#animButtons").append(animalRender);
        }
    }

    // add new button / add to array

    $("#addNew").on("click", function(event) {
        event.preventDefault();
        var animal = $("#newInput").val().trim();

    // push input to array to show new button

        animals.push(animal);
            $("#newInput").val(" ");
        renderButtons();
    });

    // call function to show on startup
    renderButtons();
 
    // show contents on click for all elements tagged with animal
    $(document).on("click", ".animal", displayInfo);

   

