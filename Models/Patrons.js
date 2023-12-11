const mongoose = require("mongoose");
const { Schema } = mongoose;

const PatronsSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},

	followingArtists: [
		{
			type: Schema.Types.ObjectId,
			ref: "artists",
		},
	],
	
	likedArtworks: [
		{
			type: Schema.Types.ObjectId,
			ref: "artwork",
		},
	],
});

module.exports = mongoose.model("patrons", PatronsSchema);
