const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
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
    type: String, 
    required: true
  },

  // The ref property links the ObjectId to the Comment model
  // This allows us to populate the Article with an associated comment
  comment: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;