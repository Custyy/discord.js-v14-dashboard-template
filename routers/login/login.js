const router = require('express').Router()
const passport = require('passport')
const DiscordStrategy = require('passport-discord').Strategy
const user = require('../../models/user.js')

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((obj, done) => done(null, obj))

passport.use(new DiscordStrategy({
    clientID: config.client.id,
    clientSecret: config.client.clientSecret,
    callbackURL: `${config.dashboard.url + (config.dashboard.port == 80 ? '' : `:${config.dashboard.port}`)}/login/callback`,
    scope: ['identify', 'guilds']
}, function (accessToken, refreshToken, profile, cb) {
    cb(null, profile)
}))

router.get('/login', passport.authenticate('discord'))

router.get('/login/callback', passport.authenticate('discord', {
    failureRedirect: '/',
}), async function (req, res) {
    res.redirect('/')

    const userData = await user.findOne({ id: req.user.id })
    if (!userData) {
        new user({
            id: req.user.id,
            ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,

            data: req.user,
        }).save()
    } else {
        userData.id = req.user.id
        userData.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

        userData.data = req.user
        await userData.save()
    }

    console.log(`(*): ${req.user.username} (${req.user.id}) logged in. (${req.headers['x-forwarded-for'] || req.connection.remoteAddress})`)

})

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err) }
        res.redirect('/')
    })
})

module.exports = router