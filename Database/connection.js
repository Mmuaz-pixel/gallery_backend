const mongoose = require("mongoose");

const MONGOURI = "mongodb://localhost:27017";

const connectToDb = async () => {
	mongoose.set("strictQuery", false);
	try {
		const connection = await mongoose.connect(MONGOURI);
	} catch (error) {
		console.log("Error while connecting to DB");
	}

	console.log("Mongo connected");

};

module.exports = connectToDb;