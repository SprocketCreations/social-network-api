const users = require("express").Router();
const { isValidObjectId } = require("mongoose");
const { setTheUsername } = require("whatwg-url");
const { User } = require("../../models");
//#region Users

users.get("/", async (req, res) => {
	try {
		// Return all users
		const users = await User.find();
		if (users) {
			return res.json({ users });
		}
		return res.sendStatus(404);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
});

users.get("/:id", async (req, res) => {
	try {
		if (isValidObjectId(req.params.id)) {
			const user = await User.findById(req.params.id);
			// TODO: Return a user by their id
			// include thoughts and friends
			if (user) {
				return res.json({ user });
			}
		}
		return res.sendStatus(404);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
});

users.post("/", async (req, res) => {
	try {
		const user = await User.create({
			username: req.body.username,
			email: req.body.email,
		});
		if (user) {
			return res.status(201).json({ user });
		}
		return res.sendStatus(400);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
});

users.put("/:id", async (req, res) => {
	try {
		if (isValidObjectId(req.params.id)) {
			const user = await User.findByIdAndUpdate(
				req.params.id, {
				username: req.body.username,
				email: req.body.email,
			});
			if (user) {
				return res.status(201).json({ rows: 1 });
			}
		}
		return res.sendStatus(404);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
});

users.delete("/:id", async (req, res) => {
	try {
		if (isValidObjectId(req.params.id)) {
			const user = await User.findByIdAndDelete(req.params.id).exec();
			if (user) {
				return res.json({ rows: 1 });
			}
		}
		return res.sendStatus(404);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
});

//#endregion Users
//#region Friends

users.post("/:userId/friends/:friendId", (req, res) => {
	// add friendId to userId's friends list
	try {
		if (isValidObjectId(req.params.userId) && isValidObjectId(req.params.friendId)) {

		}
		return res.sendStatus(404);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
});

users.delete("/:userId/friends/:friendId", async (req, res) => {
	// remove friendId to userId's friends list
	try {
		if (isValidObjectId(req.params.friendId) &&
			await User.findById(req.params.friendId) &&
			isValidObjectId(req.params.userId)) {

			const user =
				await User.findByIdAndUpdate(
					req.params.userId,
					//TODO:
					{
						//friends: ????
					}
				);
		}
		return res.sendStatus(404);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
});

//#endregion Friends

module.exports = users;