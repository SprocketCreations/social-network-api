const { isValidObjectId } = require("mongoose");
const db = require("../../config/connection");
const { Thought, User } = require("../../models");

const thoughts = require("express").Router();

//#region Thoughts

thoughts.get("/", async (req, res) => {
	try {
		const thoughts = await Thought.find();
		if (thoughts) {
			return res.json({ thoughts: thoughts });
		}
		return res.sendStatus(404);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
});

thoughts.get("/:id", async (req, res) => {
	try {
		if (isValidObjectId(req.params.id)) {
			const thought = await Thought.findById(req.params.id);
			if (thought) {
				return res.json({ thought: thought });
			}
		}
		return res.sendStatus(404);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
});

thoughts.post("/", async (req, res) => {
	try {
		if (isValidObjectId(req.body.userId)) {
			try {
				let thought = null;
				await db.transaction(async session => {
					// Get user
					const user = await User.findById(req.body.userId);
					if (!user) throw new Error("User does not exist!");
					thought = await Thought.create({
						text: req.body.text,
						username: user.username
					});
					if (!thought) throw new Error("Failed to create thought!");

					user.thoughts.push(thought._id);
					user.save();
					//TODO: Throw error if save failed...
				});
				return res.status(201).json({ thought: thought });
			} catch (error) {
				console.log(error)
				return res.sendStatus(400);
			}
		}
		return res.sendStatus(400);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
});

thoughts.put("/:id", async (req, res) => {
	try {
		if (isValidObjectId(req.params.id)) {
			const thought = await Thought.findByIdAndUpdate(req.params.id, {
				text: req.body.text
			});
			if (thought) {
				return res.status(200).json({ rows: 1 });
			}
		}
		return res.sendStatus(404);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
});

thoughts.delete("/:id", async (req, res) => {
	try {
		if (isValidObjectId(req.params.id)) {
			try {
				let rows = 0;
				await db.transaction(async session => {
					const thought = await Thought.findByIdAndDelete(req.params.id);
					if (!thought) throw new Error("Thought does not exist!");
					++rows;
					const user = await User.findOneAndUpdate({
						username: thought.username
					}, {
						$pull: {
							thoughts: thought._id,
						}
					});
					if (user)
						++rows;
					else
						console.log("User could not be found!")

				});
				return res.json({ rows: rows });
			} catch (error) {
				console.log(error);
			}
		}
		return res.sendStatus(404);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
});

//#endregion Thoughts

//#region Reactions

thoughts.post("/:thoughtId/reactions", async (req, res) => {
	try {
		if (isValidObjectId(req.params.thoughtId) &&
			isValidObjectId(req.body.userId)) {
			try {
				let reaction = null;
				//Create a reaction and add it to the thought's table
				await db.transaction(async session => {
					const user = await User.findById(req.body.userId);
					if (!user) throw new Error("User does not exist!");
					reaction = {
						username: user.username,
						text: req.body.text,
					};
					const thought = await Thought.findByIdAndUpdate(
						req.params.thoughtId, {
						$push: {
							reactions: reaction
						}
					});
					if (!thought) throw new Error("Failed to make reaction!");
				});
				return res.status(201).json({ reaction: reaction });
			} catch (error) {
				console.log(error);
				return res.sendStatus(400);
			}
		}
		return res.sendStatus(404);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
});

thoughts.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
	try {
		if (isValidObjectId(req.params.thoughtId) &&
			isValidObjectId(req.params.reactionId)) {

			const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, {
				$pull: {
					reactions: {
						reactionId: req.params.reactionId
					}
				}
			});
			if (thought &&
				thought.reactions.find(reaction => reaction.reactionId.equals(req.params.reactionId))
			) {
				console.log(thought);
				return res.json({ rows: 1 });
			}
		}
		return res.sendStatus(404);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
	// Remove a given reaction from the thought's table by id
});

//#endregion Reactions

module.exports = thoughts;