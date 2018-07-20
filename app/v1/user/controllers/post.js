const validate = require('validate.js');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const validator = require('../validator/post');
const responses = require('../../tools/responses');
const queries = require('../queries/post');


const controller = {};


controller.getAll = async ((req, res) => {
    req.body.userId = req.session.userId;
    try { 
        let response = await (queries.getAll(req.body));
        response = responses.successWithData(response);
        res.status(200).send(response);

    } catch(error) {
        error = responses.error(error);
        res.status(500).send(error);

    }
});


    
module.exports = controller;