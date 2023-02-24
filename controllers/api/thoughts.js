const { isValidObjectId } = require("mongoose");
const { Thought, User } = require("../../models");

const thoughts = require("express").Router();

//#region Thoughts

thoughts.get("/", async (req, res) => {
	try {
		const thoughts = await Thought.find();
		if (thoughts) {
			return res.json({ thoughts });
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
				return res.json({ thought });
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
			const user = await User.findById(req.body.userId);
			if (user) {
				const thought = await Thought.create({
					body: req.body.body,
					username: user.username
				});
				if (thought) {
					// I guessed at this part and it worked???
					user.thoughts.push(thought._id);
					//TODO:?? somehow await this operation?
					user.save();
					return res.status(201).json({ thought });
				}
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
		if (isValidObjectId(req.params.id) &&
			await Thought.findByIdAndDelete(req.params.id)) {

			return res.json({ rows: 1 });
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
		if (isValidObjectId(req.params.thoughtId)) {

		}
		return res.sendStatus(404);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
	//Create a reaction and add it to the thought's table
});

thoughts.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
	try {
		if (isValidObjectId(req.params.thoughtId) &&
			await Thought.findById(req.params.thoughtId) &&
			isValidObjectId(req.params.reactionId)) {

			
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