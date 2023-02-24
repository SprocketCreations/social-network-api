const { ObjectId, ObjectID } = require("bson");
const { default: mongoose, Schema}  = require("mongoose");


const userSchema = Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
		lowercase: true,
		trim: true,
		match: /^[\w-\.-]+@([\w-]+\.)+[\w-]{2,4}$/g,
	},
	thoughts: {
		type: [ObjectId],
	},
	friends: {
		type: [ObjectID],
	}
});

//Create virtual friendCount that is the length of friends array
userSchema.virtual("friendCount").get(function(){
	return this.friends.length;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
