// const router = require('express').Router();
// let User = require('../models/user.model');


// router.route('/').get((req, res) => {
//     User.find()
//         .then(users => res.json(users))
//         .catch(err => res.status(400).json('Error: ' + err));
// })

// router.route('/add').post((req, res) => {
//     const userId = req.body.userId;
//     const username = req.body.username;
//     const email = req.body.email;

//     const newUser = new User({
//         userId,
//         username,
//         email
//     });

//     newUser.save()
//         .then(() => res.json('User added!'))
//         .catch(err => res.status(400).json('Error: ' + err));
// })


// router.route('/:id').get((req, res) => {
//     User.findById(req.params.id)
//         .then(user => res.json(user))
//         .catch(err => res.status(400).json('Error: ' + err));
// })

// router.route('/:id').delete((req, res) => {
//     User.findByIdAndDelete(req.params.id)
//         .then(() => res.json('User deleted.'))
//         .catch(err => res.status(400).json('Error: ' + err));
// })


// router.route('/update/:id').post((req, res) => {
//     User.findById(req.params.id)
//         .then(user => {
//             user.userId = req.body.userId;
//             user.username = req.body.username;
//             user.email = req.body.email;

//             user.save()
//                 .then(() => res.json('User updated!'))
//                 .catch(err => res.status(400).json('Error: ' + err))
//         })
//         .catch(err => res.status(400).json('Error: ' + err));
// })


// module.exports = router;


const router = require('express').Router();
let User = require('../models/user.model');

// Get all users
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new user
router.route('/add').post((req, res) => {
    const { username, password, email, matric, faculty, semester } = req.body;

    const newUser = new User({
        username,
        password,
        email,
        matric,
        faculty,
        semester
    });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get user by ID
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete user by ID
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update user by ID
router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;
            user.password = req.body.password;
            user.email = req.body.email;
            user.matric = req.body.matric;
            user.faculty = req.body.faculty;
            user.semester = req.body.semester;

            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
