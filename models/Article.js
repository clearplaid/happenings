var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  // Headline - the title of the article
  title: {
    type: String,
    required: true
  },
  // URL- url to original article
  link: {
    type: String,
    required: true
  },
  // Summary - a short summary of the article
  summary: {
    type: String, // check and see if there is a long string option
    required: true
  },
// Feel free to add more content to your database (photos, bylines, and so on)

  // The ref property links the ObjectId to the Comment model
  // This allows us to populate the Article with an associated comment
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;