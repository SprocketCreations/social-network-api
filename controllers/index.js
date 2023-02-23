const router = require("express").Router();





router.get("/", (req, res) => {
	return res.send("hello");
})


module.exports = router;
