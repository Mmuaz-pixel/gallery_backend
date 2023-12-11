const mongoose = require("mongoose");
const { Schema } = mongoose;

const artworkSchema = new Schema({
	title: { type: String },
	artist: { type: Schema.Types.ObjectId, ref: "artists" },
	year: { type: Number },
	category: { type: String },
	medium: { type: String },
	description: { type: String },
	poster: { type: String },
	likes: { type: Number , default: 0}
});

module.exports = mongoose.model("artwork", artworkSchema);
