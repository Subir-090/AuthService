const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    saltRounds: 10,
    JWT_KEY: process.env.JWT_KEY
}
