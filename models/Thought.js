const { ObjectId, ObjectID } = require("bson");
const mongoose = require("mongoose");


const reactionSchema = mongoose.Schema({
	reactionId: {
		type: ObjectId,
		default: new ObjectId()
	},
	body: {
		type: String,
		//required
		//character limit 1 -> 280 
	},
	username: {
		type: String,
		//required
	},
	createdAt: {
		type: Date,
		default: Date.now,
		//Getter for formatting the date.
	}
});

const thoughtSchema = mongoose.Schema({
	text: {
		type: String,
		//required
		//limit 1 -> 280
	},
	createdAt: {
		type: Date,
		default: Date.now
		//custom getter to format the date
	},
	username: {
		type: String,
		//required
	},
	reactions: {
		type: [reactionSchema]
	}
});

//Create virtual reactionCount that is the length of reactions array


const User = mongoose.model("Thought", thoughtSchema);

module.exports = User;
