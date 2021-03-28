const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    review: String,

})

const bookSchema = new Schema({
    title: String,
    
})