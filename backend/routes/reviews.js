const router = require('express').Router();
let Review = require('../models/review.model');


router.route('/').get((req, res) => {
    Review.find()
        .then(reviews => res.json(reviews))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    const assessmentId = req.body.assessmentId;
    const reviewId = req.body.reviewId;
    const reviewerId = req.body.reviewerId;
    const reviewedUserId = req.body.reviewedUserId;
    const teamId = req.body.teamId;
    const rating = req.body.rating;
    const comments = req.body.comments;



    const newReview = new Review({
        assessmentId,
        reviewId,
        reviewerId,
        reviewedUserId,
        teamId,
        rating,
        comments,

    });

    newReview.save()
        .then(() => res.json('Review added!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').get((req, res) => {
    Team.findById(req.params.id)
        .then(team => res.json(team))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').delete((req, res) => {
    Team.findByIdAndDelete(req.params.id)
        .then(() => res.json('Review deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
})


router.route('/update/:id').post((req, res) => {
    Review.findById(req.params.id)
        .then(review => {
            review.assessmentId = req.body.assessmentId;
            review.reviewId = req.body.reviewId;
            review.reviewerId = req.body.reviewerId;
            review.reviewedUserId = req.body.reviewedUserId;
            review.teamId = req.body.teamId;
            review.rating = req.body.rating;
            review.comments = req.body.comments;


            team.save()
                .then(() => res.json('Review updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;