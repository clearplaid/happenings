// submit comments and save to corresponding article
$(document).on("submit", function () {
    var selected = $(this).parent("id");
    console.log("post selected: " + selected)
    $.ajax({
        method: "POST",
        url: "/articles/" + selected,
        data: {
            title: $("#titleInput").val(),
            body: $("#bodyInput").val()
        }
    })
    .then(function(data) {
        console.log(data);
        location.reload()
    });

    $("#titleInput").val("");
    $("#bodyInput").val("");
})

// delete article 
$(".delete-art").on("click", function() {
    var selected = $(this).attr("id");
    console.log("selected: " + selected);

    $.ajax({
        method: "GET",
        url: "/delete/" + selected
    })
    .then(function(data) {
        console.log("article successfully deleted")
        location.reload()
    })
  })