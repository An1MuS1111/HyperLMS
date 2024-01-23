const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Review Schema
const reviewSchema = new Schema({
    peerReviewId: { type: String, required: true },
    teamId: { type: String, required: true },
    reviews: [
        {
            reviewerId: { type: String, required: true },
            reviewedUserId: { type: String, required: true },
            ratings: [{ type: Number, required: true }]
        }
    ]
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
