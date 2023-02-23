const api = require("express").Router();


api.use("/thoughts", require("./thoughts"));
api.use("/users", require("./users"));


module.exports = api;