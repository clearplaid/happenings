// submit comments and save to corresponding article
$("#saveComment").on("submit", function () {
    event.preventDefault();
    var selectedArticle = $(this).parent("id");
    var comment = {};
    comment.title = $("#titleInput").val("").trim();
    comment.body = $("#bodyInput").val("").trim();
console.log(comment)
    $.ajax({
        method: "POST",
        url: "/articles/" + selectedArticle,
        data: comment
    })
    .then(function(data) {
        console.log(data);
        location.reload()
        $("#titleInput").val("");
        $("#bodyInput").val("");
    });

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

// delete comment 
$(".delete-comment").on("click", function() {
    var selectedComment = $(this).attr("data-id");
    var selectedArticle = $(this).parent("data-id");
    console.log("selected comment: " + selectedComment);
    console.log("selected article: " + selectedArticle);

    $.ajax({
        method: "GET",
        url: "/comment/delete/" + selectedComment + "/" + selectedArticle,
    })
    .then(function(data) {
        console.log("comment successfully deleted")
        location.reload()
    })
})
  