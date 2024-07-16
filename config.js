module.exports = {
    client: {
        token: '',
        id: '',
        clientSecret: ''
    },

    database: {
        url: 'mongodb://localhost:27017',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    },

    dashboard: {
        url: 'http://localhost',
        port: 3000,
        
        isCustomDomain: false
    },
}