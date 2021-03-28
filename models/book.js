const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    reviewer: String,
    rating: {type: Number, min: 1, max: 5},
    comment: String
}, {
timestamps:true
})

const bookSchema = new Schema({
    title: String,
    author: String,
    reviews: [reviewSchema]
}, {
    timestamps:true
})

module.exports = mongoose.model("Book", bookSchema)