const { ObjectId, ObjectID } = require("bson");
const dayjs = require("dayjs");
const mongoose = require("mongoose");


const reactionSchema = mongoose.Schema({
	reactionId: {
		type: ObjectId,
		default: ObjectId
	},
	text: {
		type: String,
		required: true,
		minLength: 1,
		maxLength: 280,
	},
	username: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		get: date => dayjs(date).format("MM/DD/YYYY"),
	}
}, {
	_id: false,
	toJSON: {
		getters: true,
	},
});

const thoughtSchema = mongoose.Schema({
	text: {
		type: String,
		required: true,
		minLength: 1,
		maxLength: 280,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		get: date => console.log(dayjs(date).format("MM/DD/YYYY")),
	},
	username: {
		type: String,
		required: true,
		minLength: 1,
	},
	reactions: {
		type: [reactionSchema]
	}
}, {
	toJSON: {
		getters: true,
	},
});

//Create virtual reactionCount that is the length of reactions array
thoughtSchema.virtual("reactionCount").get(function() {
	return this.reactions.length;
});

const User = mongoose.model("Thought", thoughtSchema);

module.exports = User;
