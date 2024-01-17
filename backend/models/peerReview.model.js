const mongoose = require('mongoose');

const peerReviewSchema = new mongoose.Schema({
    reviewName: {
        type: String,
        required: true,
    },
    reviewDetails: {
        type: String,
        required: true,
    },
    questions: [
        {
            questionId: {
                type: Number,
                required: true,
            },
            question: {
                type: String,
                required: true,
            },
        },
    ],
    teams: [
        {
            type: String,
            required: true,
        },
    ],
});

const PeerReview = mongoose.model('PeerReview', peerReviewSchema);

module.exports = PeerReview;
