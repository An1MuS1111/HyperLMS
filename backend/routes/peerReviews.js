const router = require('express').Router();
const PeerReview = require('../models/peerReview.model');

router.route('/').get((req, res) => {
    PeerReview.find()
        .then(peerReviews => res.json(peerReviews))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const { reviewName, reviewDetails, questions, teams } = req.body;

    const newPeerReview = new PeerReview({
        reviewName,
        reviewDetails,
        questions,
        teams,
    });

    newPeerReview.save()
        .then(() => res.json('PeerReview added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    PeerReview.findById(req.params.id)
        .then(peerReview => res.json(peerReview))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    PeerReview.findByIdAndDelete(req.params.id)
        .then(() => res.json('PeerReview deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    PeerReview.findById(req.params.id)
        .then(peerReview => {
            peerReview.reviewName = req.body.reviewName;
            peerReview.reviewDetails = req.body.reviewDetails;
            peerReview.questions = req.body.questions;
            peerReview.teams = req.body.teams;

            peerReview.save()
                .then(() => res.json('PeerReview updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
