const users = require("express").Router();
const { isValidObjectId } = require("mongoose");
const db = require("../../config/connection");
const { User, Thought } = require("../../models");
//#region Users

users.get("/", async (req, res) => {
	try {
		// Return all users
		const users = await User.find();
		if (users) {
			return res.json({ users: users });
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
				return res.json({ user: user });
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
			return res.status(201).json({ user: user });
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
			try {
				let rows = 0;
				await db.transaction(async session => {
					const user = await User.findByIdAndDelete(req.params.id).exec();
					if (!user) throw new Error("User does not exist!");
					++rows;
					{// Remove all owned thoughts
						const n = user.thoughts.length;
						rows += n;
						for (let i = 0; i < n; ++i) {
							await Thought.findByIdAndDelete(user.thoughts[i]);
						}
					} { // Remove this user from all their friend's friend lists
						const n = user.friends.length
						rows += n;
						for (let i = 0; i < n; ++i) {
							await User.findByIdAndUpdate(user.friends[i], {
								$pull: {
									friends: user._id,
								}
							});
						}
					}
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

//#endregion Users
//#region Friends

users.post("/:userId/friends/:friendId", async (req, res) => {
	try {
		if (isValidObjectId(req.params.userId) && isValidObjectId(req.params.friendId)) {
			// add friendId to userId's friends list
			try {
				let user = null;
				await db.transaction(async session => {
					const friend = await User.findById(req.params.friendId);
					if (!friend) throw new Error("Friend does not exist!");
					user = await User.findByIdAndUpdate(req.params.userId, {
						$addToSet: { friends: friend._id },
					}, {
						new: true,
					});
					if (!user) throw new Error("User does not exist!");
					friend.friends.addToSet(user._id);
					friend.save();
				});
				return res.status(201).json({ user: user });
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

users.delete("/:userId/friends/:friendId", async (req, res) => {
	// remove friendId to userId's friends list
	try {
		if (isValidObjectId(req.params.friendId) &&
			isValidObjectId(req.params.userId)) {

			try {
				let user = null;
				await db.transaction(async session => {
					user = await User.findByIdAndUpdate(
						req.params.userId, {
						$pull: { friends: req.params.friendId },
					}, {
						new: true,
					});
					if (!user) throw new Error("User does not exist!");
					friend = await User.findByIdAndUpdate(
						req.params.friendId, {
						$pull: { friends: req.params.userId },
					}, {
						new: true,
					});
					if (!friend) throw new Error("Friend does not exist!")
				});
				return res.json({ user: user });
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

//#endregion Friends

module.exports = users;