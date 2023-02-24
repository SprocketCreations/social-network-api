const db = require("../config/connection");
const { ObjectId, ObjectID } = require("bson");
const { User, Thought } = require("../models");

db.once("open", async () => {
	try {
		await Promise.all([
			User.deleteMany({}),
			Thought.deleteMany({}),
		]);
		await Promise.all([
			User.create([
				{
					_id: new ObjectId("63f913f7af31778c41edabd0"),
					username: "JoeMama",
					email: "example@ema.il",
					thoughts: [
						new ObjectId("63f913f7af31778c41edabd5"),
					],
					friends: [
						new ObjectId("63f913f7af31778c41edabd1"),
					],
				}, {
					_id: new ObjectId("63f913f7af31778c41edabd1"),
					username: "BaldThor",
					email: "danial@hotmail.gg",
					thoughts: [
						new ObjectId("63f913f7af31778c41edabd0"),
					],
					friends: [

					],
				}, {
					_id: new ObjectId("63f913f7af31778c41edabd2"),
					username: "FastSnail",
					email: "gmail@hotmail.co.uk",
					thoughts: [

					],
					friends: [

					],
				}, {
					_id: new ObjectId("63f913f7af31778c41edabd3"),
					username: "Trex",
					email: "running@out.of",
					thoughts: [
						new ObjectId("63f913f7af31778c41edabd7"),
					],
					friends: [
						new ObjectId("63f913f7af31778c41edabd4"),
					],
				}, {
					_id: new ObjectId("63f913f7af31778c41edabd4"),
					username: "ProfessionalOven",
					email: "email@names.tv",
					thoughts: [
						new ObjectId("63f913f7af31778c41edabd6"),
					],
					friends: [
						new ObjectId("63f913f7af31778c41edabd3"),
					],
				},
			]),
			Thought.create([
				{
					_id: new ObjectId("63f913f7af31778c41edabd5"),
					text: "Ever notice the color of the sky?",
					username: "JoeMama",
					reactions: [
						{
							reactionId: new ObjectId("63f913f7af31778c41edabe0"),
							username: "BaldThor",
							text: "What"
						}, {
							reactionId: new ObjectId("63f913f7af31778c41edabe1"),
							username: "Trex",
							text: "Follow me on soundcloud"
						}
					],
				}, {
					_id: new ObjectId("63f913f7af31778c41edabd6"),
					text: "This api sucks",
					username: "ProfessionalOven",
					reactions: [
						{
							reactionId: new ObjectId("63f913f7af31778c41edabe2"),
							username: "FastSnail",
							text: "Then make a better one. Nerd."
						}, {
							reactionId: new ObjectId("63f913f7af31778c41edabe3"),
							username: "Trex",
							text: "What is your opinion on music?"
						}
					],
				}, {
					_id: new ObjectId("63f913f7af31778c41edabd7"),
					text: "Who's exited for my next record?",
					username: "Trex",
					reactions: [
						{
							reactionId: new ObjectId("63f913f7af31778c41edabe4"),
							username: "FastSnail",
							text: "Can you stop spamming everyone about your music?"
						}
					],
				}
			])
		]);

		process.exit(0);
	} catch (error) {
		console.log(error);
	}
});