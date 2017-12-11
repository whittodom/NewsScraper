var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema ({
	title: {
		type: String,
		trim: true,
		unique: true,
		required: "This is required"
	},
	link: {
		type: String,
		trim: true,
		required: "This is required"
	},
	body: {
		type: String,
		trim: true,
		required: "This is required"
	},
	comment: [
	{
		type: Schema.Types.ObjectId,
		ref: "comment"	
	}
	]
});

var Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;