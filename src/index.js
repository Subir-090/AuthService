const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const routes = require('./routes/index');
const db = require('./models/index');


function setUpServer() {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));

    app.use('/api',routes);

    app.listen(PORT, async () => {
        console.log(`Server started at ${PORT}`);
        if(process.env.DB_SYNC) {
            db.sequelize.sync({alter: true});
        }
    });
}

setUpServer();