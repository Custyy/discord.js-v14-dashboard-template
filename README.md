# ✨ Discord.js v14 Dashboard Template

A template for discord.js v14 bots with dashboard.

## ➡️ Installation

1. Clone the repository

```sh
git clone https://github.com/Custyy/discord.js-v14-dashboard-template.git
```

2. Install NPM packages

```sh
npm install
```

3. Start the bot with the following command

```sh
npm run start
```

4. Go the dashboard

```sh
http://localhost:3000
```

## License

[ISC](https://choosealicense.com/licenses/isc/) © [Custyy](https://github.com/Custyy)

## 👀 Example config.js file

```js
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
```

## ⭐ Versions Used

- Node.js: v20.11.1 or higher
- Discord.js: v14.15.3 or higher

# [YouTube](https://youtube.com/@Custyy) | [Discord](https://discord.gg/jMJjHUHjQZ)