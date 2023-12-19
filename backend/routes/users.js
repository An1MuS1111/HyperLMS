const router = require('express').Router()
let User = require('../models/user.model')


router.route('/').get((res, req) => {
    res.send("Router")
})

module.exports = router;