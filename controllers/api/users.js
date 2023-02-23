const users = require("express").Router();

//#region Users

users.get("/", (req, res) => {
	// Return all users
	return res.send("hello");
});

users.get("/:id", (req, res) => {
	// Return a user by their id
	// include thoughts and friends
	return res.send("hello");
});

users.post("/", (req, res) => {
	return res.send("hello");
});

users.put("/:id", (req, res) => {
	return res.send("hello");
});

users.delete("/:id", (req, res) => {
	// remove user's thoughts as well
	return res.send("hello");
});

//#endregion Users
//#region Friends

users.post("/:userId/friends/:friendId", (req, res) => {
	// add friendId to userId's friends list
	return res.send("hello");
});

users.delete("/:userId/friends/:friendId", (req, res) => {
	// remove friendId to userId's friends list
	return res.send("hello");
});

//#endregion Friends

module.exports = users;