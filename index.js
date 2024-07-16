global.config = require('./config.js')
const Discord = require('discord.js')
const { createServer } = require('http')
const express = require('express')
const app = express()
const glob = require('glob')
const session = require('express-session')
const server = createServer(app)
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const { connect } = require('mongoose')
const passport = require('passport')
const MemoryStore = require('memorystore')(session)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.engine('html', require('ejs').renderFile)

app.set('view engine', 'html')
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(cookieParser())
app.use(session({
    store: new MemoryStore({ checkPeriod: 86400000 }),
    secret: '', // Fill here
    resave: false,
    saveUninitialized: false
})).use(passport.initialize()).use(passport.session())
app.use(passport.initialize())
app.use(passport.session())

const files = glob.sync('./routers/**/*.js')
files.forEach((file, index) => {
    app.use('/', require(path.join(__dirname, '.', file)))
    if (index === (files.length - 1)) {
        console.log(`(*): Total ${files.length} routers loaded.`)
        listen()
        app.use((req, res) => {
            return res.status(404).json({ status: false, message: '404 - Page not found.' })
        })
    }
})

function listen() {
    server.listen(config.dashboard.port, () => {
        console.log(`(*): Server listening on ::${config.dashboard.port}.`)
    })
}

connect(config.database.url, config.database.options).then(() => {
    console.log('(*): Database connection successfully established.')
}).catch((err) => {
    console.log('(!): Database connection could not be established.')
    console.log(err)
})

require('./client/index.js')