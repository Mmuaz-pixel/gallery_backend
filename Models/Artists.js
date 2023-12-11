const mongoose = require("mongoose");
const { Schema } = mongoose;

const ArtistSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true,
	},
	artworks: [{
		type: Schema.Types.ObjectId,
		ref: "artwork"
	}],
	workshops: [{
		type: Schema.Types.ObjectId,
		ref: "Workshops"
	}],
	followers: [{ 
		type: Schema.Types.ObjectId, 
		ref: "patrons" 
	}],
});

module.exports = mongoose.model("artists", ArtistSchema);