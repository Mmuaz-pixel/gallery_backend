const mongoose = require("mongoose");

const { Schema } = mongoose;

const workshopSchema = new Schema({
	title: String,
	artist: { type: Schema.Types.ObjectId, ref: "artists" },
	description: {
		type: String,
	},
});

module.exports = mongoose.model("workshops", workshopSchema);
