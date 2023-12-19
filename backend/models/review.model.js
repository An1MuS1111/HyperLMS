const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Review Schema
const reviewSchema = new Schema({
    reviewId: { type: String, required: true, unique: true },
    reviewerId: { type: String, required: true },
    reviewedUserId: { type: String, required: true },
    teamId: { type: String, required: true },
    rating: { type: Number, required: true },
    comments: { type: String }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review