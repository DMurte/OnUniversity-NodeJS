'use strict'

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const routes = require('./app/v1/routes');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);
app.use('/api/v1',routes);

app.listen( 3678, function() {
    console.log('\x1b[36m','OnUniversity API : http://localhost:3678');

});

