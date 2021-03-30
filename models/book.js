const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    reviewer: String,
    rating: {type: Number, min: 1, max: 5, default: 5},
    comment: String
}, {
timestamps:true
})

const bookSchema = new Schema({
    title: String,
    author: String,
    readAgain: {type: Boolean, default: false },
    collectedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    reviews: [reviewSchema]
}, {
    timestamps:true
})

module.exports = mongoose.model("Book", bookSchema)