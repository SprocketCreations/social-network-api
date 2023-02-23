const { ObjectId, ObjectID } = require("bson");
const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
	username: {
		type: String,
		//unique
		//required
		//trimmed
	},
	email: {
		type: String,
		//unique
		//required
		//is email
	},
	thoughts: {
		type: [ObjectId],
		//foreign key to Thought Model
	},
	friends: {
		type: [ObjectID]
		//foreign key to User model
	}
});

//Create virtual friendCount that is the length of friends array


const User = mongoose.model("User", userSchema);

module.exports = User;
