const thoughts = require("express").Router();

//#region Thoughts

thoughts.get("/", (req, res) => {
	return res.send("hello");
});

thoughts.get("/:id", (req, res) => {
	return res.send("hello");
});

thoughts.post("/", (req, res) => {
	// Add the new thought's id to the owner's user table.
	return res.send("hello");
});

thoughts.put("/:id", (req, res) => {
	return res.send("hello");
});

thoughts.delete("/:id", (req, res) => {
	return res.send("hello");
});

//#endregion Thoughts

//#region Reactions

thoughts.post("/:thoughtId/reactions", (req, res) => {
	//Create a reaction and add it to the thought's table
	return res.send("hello");
});

thoughts.delete("/:thoughtId/reactions/:reactionId", (req, res) => {
	// Remove a given reaction from the thought's table by id
	return res.send("hello");
});

//#endregion Reactions

module.exports = thoughts;