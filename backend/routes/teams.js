const router = require('express').Router();
let Team = require('../models/team.model');


router.route('/').get((req, res) => {
    Team.find()
        .then(teams => res.json(teams))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {

    const teamName = req.body.teamName;
    const members = req.body.members;



    const newTeam = new Team({

        teamName,
        members
    });

    newTeam.save()
        .then(() => res.json('Team added!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').get((req, res) => {
    Team.findById(req.params.id)
        .then(team => res.json(team))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').delete((req, res) => {
    Team.findByIdAndDelete(req.params.id)
        .then(() => res.json('Team deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
})


router.route('/update/:id').post((req, res) => {
    Team.findById(req.params.id)
        .then(team => {

            team.teamName = req.body.teamName;
            team.members = req.body.members;



            team.save()
                .then(() => res.json('Team updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;