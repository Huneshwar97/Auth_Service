const express = require('express');
const bodyParser = require('body-parser')

const {PORT} = require('./config/serverConfig');

const app = express();

const prepareAndStartServer = () => {

    app.listen(PORT,() => {
        console.log(`Server Started at ${PORT}`);
    })
}

prepareAndStartServer();