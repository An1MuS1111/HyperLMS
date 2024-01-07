const router = require('express').Router();
const Assessment = require('../models/assessment.model');

router.route('/').get((req, res) => {
    Assessment.find()
        .then(assessments => res.json(assessments))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const assessmentId = req.body.assessmentId;
    const questions = req.body.questions; // Assuming questions is an array of objects

    const newAssessment = new Assessment({
        assessmentId,
        questions,
    });

    newAssessment.save()
        .then(() => res.json('Assessment added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Assessment.findById(req.params.id)
        .then(assessment => res.json(assessment))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Assessment.findByIdAndDelete(req.params.id)
        .then(() => res.json('Assessment deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Assessment.findById(req.params.id)
        .then(assessment => {
            assessment.assessmentId = req.body.assessmentId;
            assessment.questions = req.body.questions; // Assuming questions is an array of objects

            assessment.save()
                .then(() => res.json('Assessment updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
