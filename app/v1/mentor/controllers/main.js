const validate = require('validate.js');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const validator = require('../validator/main');
const responses = require('../../tools/responses');
const queries = require('../queries/main');


const controller = {};


controller.getAll = async ((req, res) => {
    req.params.userId = req.session.userId;
    try { 
        let response = await (queries.getAll());
        response = responses.successWithData(response);
        res.status(200).send(response);

    } catch(error) {
        error = responses.error(error);
        res.status(500).send(error);

    }
});

controller.create = async ((req, res) => {
    req.params.userId = req.session.userId;
    const validation = validate(req.params, validator.create, { format: 'flat' });
    if (validation) {
        const error = responses.error(validation);
        res.status(500).send(error);
        return;
    }

    try { 
        let response = await (queries.create(req.params));
        response = responses.successWithData(response);
        res.status(200).send(response);

    } catch(error) {
        error = responses.error(error);
        res.status(500).send(error);

    }
});

controller.createTopic = async ((req, res) => {
    req.body.userId = req.session.userId;
    const validation = validate(req.body, validator.createTopic, { format: 'flat' });
    if (validation) {
        const error = responses.error(validation);
        res.status(500).send(error);
        return;
    }

    try { 
        let response = await (queries.createTopic(req.body));
        response = responses.successWithData(response);
        res.status(200).send(response);

    } catch(error) {
        error = responses.error(error);
        res.status(500).send(error);

    }
});

controller.deleteTopic = async ((req, res) => {
    req.body.userId = req.session.userId;
    const validation = validate(req.body, validator.deleteTopic, { format: 'flat' });
    if (validation) {
        const error = responses.error(validation);
        res.status(500).send(error);
        return;
    }

    try { 
        let response = await (queries.deleteTopic(req.body));
        response = responses.successWithData(response);
        res.status(200).send(response);

    } catch(error) {
        error = responses.error(error);
        res.status(500).send(error);

    }
});

controller.getMentorships = async ((req, res) => {
    req.params.userId = req.session.userId;
    try { 
        let response = await (queries.getMentorships(req.params));
        response = responses.successWithData(response);
        res.status(200).send(response);

    } catch(error) {
        error = responses.error(error);
        res.status(500).send(error);

    }
});

controller.delete = async ((req, res) => {
    const validation = validate(req.body, validator.delete, { format: 'flat' });
    if (validation) {
        const error = responses.error(validation);
        res.status(500).send(error);
        return;
    }

    try { 
        let response = await (queries.delete(req.body));
        response = responses.successWithData(response);
        res.status(200).send(response);

    } catch(error) {
        error = responses.error(error);
        res.status(500).send(error);

    }
});

    
module.exports = controller;