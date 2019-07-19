$(document).on("click", "div", function() {
    $("#comments").empty();
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
    .then(function(data) {
        console.log("data: " + data);

    //     $("#comments").append("<h3>" + data.title + "</h3>");
    //     $("#comments").append("<input id='titleInput' name='title' >");
    //     $("#comments").append("<textarea id='bodyInput' name='body'></textarea>");
    //   // A button to submit a new note, with the id of the article saved to it
    //   $("#comments").append("<button data-id='" + data._id + "' id='saveComment'>Save Comment</button>");

    //   if(data.comment) {
    //       $("#titleInput").val(data.comment.title);
    //       $("#bodyInput").val(data.comment.body);
    //   }
    });
});

$(document).on("click", "#saveComment", function() {
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("#titleInput").val(),
            body: $("#bodyInput").val()
        }
    })
    .then(function(data) {
        console.log(data);
        $("#comments").empty();
    });

    $("#titleInput").val("");
    $("#bodyInput").val("");
})