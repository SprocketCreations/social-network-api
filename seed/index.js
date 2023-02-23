const db = require("../config/connection");
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
					username: "JoeMama",
					email: "example@ema.il"
				}, {
					username: "BaldThor",
					email: "danial@hotmail.gg"
				}, {
					username: "FastSnail",
					email: "gmail@hotmail.co.uk"
				}, {
					username: "Trex",
					email: "running@out.of"
				}, {
					username: "ProfessionalOven",
					email: "email@names.tv"
				},
			]),
			Thought.create([
				{
					text: "Ever notice the color of the sky?",
					username: "JoeMama",
					reactions: [
						{
							username: "BaldThor",
							body: "What"
						}, {
							username: "Trex",
							body: "Follow me on soundcloud"
						}
					],
				}, {
					text: "This api sucks",
					username: "ProfessionalOven",
					reactions: [
						{
							username: "FastSnail",
							body: "Then make a better one. Nerd."
						}, {
							username: "Trex",
							body: "What is your opinion on music?"
						}
					],
				}, {
					text: "Who's exited for my next record?",
					username: "Trex",
					reactions: [
						{
							username: "FastSnail",
							body: "Can you stop spamming everyone about your music?"
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