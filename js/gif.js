var topics = ["Husky", "Golden Retriever", "Bulldog", "Chihuahua", "Pug"];

function createButton() {
    $("#buttons").empty();
    for (var i = 0; i < topics.length; i++) {

        var gifButton = $("<button>");
        gifButton.addClass("dog");
        gifButton.addClass("btn btn-info");
        gifButton.attr("data-dog", topics[i]);
        gifButton.text(topics[i]);
        $("#buttons").append(gifButton);
    }
}
createButton();

$("#buttons").on("click", ".btn", function () {
    var dog = $(this).attr("data-dog");
    console.log(dog)
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${dog}&api_key=ZueKUmghYsCs0z9d5nmHdCq2kWn7hYAA&limit=10`;
    console.log(queryURL)

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {
        console.log(response)
        var results = response.data;
        for (var i = 0; i < results.length; i++) {

            // var gifDiv = $("<div>");

            var p = $("<p>").text("Rating: " + response.data[i].rating);

            var dogImage = $("<img>");

            dogImage.attr({
                "src": response.data[i].images.original_still.url,
                "data-still": response.data[i].images.original_still.url,
                "data-state": "still",
                "data-animate": response.data[i].images.fixed_height.url
            });
            dogImage.addClass("animateButton");
            $("#gifs").append(p);
            $("#gifs").prepend(dogImage);
            // $("#gifs").prepend(gifDiv);
        }
    })
});
$("#add-button").on("click", function (event) {
    event.preventDefault();

    var dogButton = $("#dog-search").val().trim();

    topics.push(dogButton);

    createButton();
});

$("#gifs").on("click", ".animateButton", function () {
    var state = $(this).attr("data-state");
    console.log(state)
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

createButton();



//make gifs side by side like example
//When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
//Add a form to your page takes the value from a user input box and adds it into your topics array. 
//Then make a function call that takes each topic in the array remakes the buttons on the page.