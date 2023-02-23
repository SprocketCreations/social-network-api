const router = require("express").Router();


router.use("/api", require("./api"));


router.get("/", (req, res) => {
	return res.send("hello");
})


module.exports = router;
