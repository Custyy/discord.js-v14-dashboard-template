const router = require('express').Router()
const userModel = require('../models/user')

router.get('/', async (req, res) => {

    const user = req.user
    const userData = await userModel.findOne({ id: user?.id })

    res.render('index.ejs', { user })
    
})

module.exports = router