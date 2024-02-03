const router = require('express').Router();
const Review = require('../models/review.model');

// Get all reviews
router.route('/').get((req, res) => {
    Review.find()
        .then(reviews => res.json(reviews))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new review
// router.route('/add').post((req, res) => {
//     const peerReviewId = req.body.peerReviewId;
//     const teamId = req.body.teamId;
//     const reviews = req.body.reviews;

//     const newReview = new Review({
//         peerReviewId,
//         teamId,
//         reviews,
//     });

//     newReview.save()
//         .then(() => res.json('Review added!'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// Add a new review
router.route('/add').post((req, res) => {
    const peerReviewId = req.body.peerReviewId;
    const teamId = req.body.teamId;
    const reviews = req.body.reviews;

    const newReview = new Review({
        peerReviewId,
        teamId,
        reviews,
    });

    newReview.save()
        .then(savedReview => res.json({ message: 'Review added!', reviewId: savedReview._id }))
        .catch(err => res.status(400).json('Error: ' + err));
});


// Get a specific review by ID
router.route('/:id').get((req, res) => {
    Review.findById(req.params.id)
        .then(review => res.json(review))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a review by ID
router.route('/:id').delete((req, res) => {
    Review.findByIdAndDelete(req.params.id)
        .then(() => res.json('Review deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/update/:id').post((req, res) => {
    Review.findById(req.params.id)
        .then(review => {
            review.peerReviewId = req.body.peerReviewId;
            review.teamId = req.body.teamId;
            review.reviews = req.body.reviews;

            review.save()
                .then(() => res.json('Review updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
