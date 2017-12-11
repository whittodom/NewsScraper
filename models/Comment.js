var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentSchema = new Schema ({
	title: {
		type: String,
		trim: true,
		required: "This is required"
	},
		
	body: {
		type: String,
		trim: true,
		required: "This is required"
	}
})

var Comment = mongoose.model("Comment", CommentSchema);

// Export the Note model
module.exports = Comment;