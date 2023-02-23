const express = require("express");
const db = require("./config/connection");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("./controllers"));

const PORT = process.env.PORT || 3000;

db.once('open', () => {
	app.listen(PORT, () => {
		console.log(`Listening on port ${PORT}`);
	});
});
