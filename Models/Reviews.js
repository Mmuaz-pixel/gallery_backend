const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
    patron: { 
        type: Schema.Types.ObjectId, 
        ref: "patrons" 
    },

    artwork: { 
        type: Schema.Types.ObjectId, 
        ref: "artwork" 
    },

    content: { type: String }
});

module.exports = mongoose.model("reviews", reviewSchema);