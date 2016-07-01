var Index = require("../controller/index");

module.exports = function(app) {
	// Index
	app.get("/", Index.showIndex);

	// Create code
	app.post("/handle_create", Index.createCode);
};