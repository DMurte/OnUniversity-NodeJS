const validate = require('validate.js');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const validator = require('../validator/main');
const responses = require('../../tools/responses');
const queries = require('../queries/main');


const controller = {};


controller.getAll = async ((req, res) => {
    try { 
        let response = await (queries.getAll());
        response = responses.successWithData(response);
        res.status(200).send(response);

    } catch(error) {
        error = responses.error(error);
        res.status(500).send(error);

    }
});

controller.getPost = async ((req, res) => {
    const validation = validate(req.params, validator.getPost, { format: 'flat' });

    if (validation) {
        const error = responses.error(validation);
        res.status(500).send(error);
        return;
    }

    try { 
        let response = await (queries.getPost(req.params));
        response = responses.successWithData(response);
        res.status(200).send(response);

    } catch(error) {
        error = responses.error(error);
        res.status(500).send(error);

    }
});

controller.moreVoted = async ((req, res) => {
    try { 
        let response = await (queries.moreVoted());
        response = responses.successWithData(response);
        res.status(200).send(response);

    } catch(error) {
        error = responses.error(error);
        res.status(500).send(error);

    }
});

controller.lessVoted = async ((req, res) => {
    try { 
        let response = await (queries.lessVoted());
        response = responses.successWithData(response);
        res.status(200).send(response);

    } catch(error) {
        error = responses.error(error);
        res.status(500).send(error);

    }
});

controller.create = async ((req, res) => {
    req.body.userId = req.session.userId;
    const validation = validate(req.body, validator.create, { format: 'flat' });
    if (validation) {
        const error = responses.error(validation);
        res.status(500).send(error);
        return;
    }

    try { 
        let response = await ( queries.create(req.body) );
        response = responses.successWithData(response);
        res.status(200).send(response);

    } catch(error) {
        error = responses.error(error);
        res.status(500).send(error);

    }
});

controller.update = async ((req, res) => {
    req.body.userId = req.session.userId;
    const validation = validate(req.body, validator.update, { format: 'flat' });
    if (validation) {
        const error = responses.error(validation);
        res.status(500).send(error);
        return;
    }

    try { 
        let response = await (queries.update(req.body));
        response = responses.successWithData(response);
        res.status(200).send(response);

    } catch(error) {
        error = responses.error(error);
        res.status(500).send(error);

    }

});

controller.delete = async ((req, res) => {
    req.params.userId = req.session.userId;
    const validation = validate(req.params, validator.delete, { format: 'flat' });
    if (validation) {
        const error = responses.error(validation);
        res.status(500).send(error);
        return;
    }

    try { 
        let response = await (queries.delete(req.params));
        response = responses.successWithData(response);
        res.status(200).send(response);

    } catch(error) {
        error = responses.error(error);
        res.status(500).send(error);

    }

});

controller.vote = async ((req, res) => {
    req.params.userId = req.session.userId;
    const validation = validate(req.params, validator.vote, { format: 'flat' });
    if (validation) {
        const error = responses.error(validation);
        res.status(500).send(error);
        return;
    }

    try { 
        let response = await (queries.vote(req.params));
        response = responses.successWithData(response);
        res.status(200).send(response);

    } catch(error) {
        error = responses.error(error);
        res.status(500).send(error);

    }

});

controller.deleteVote = async ((req, res) => {
    req.params.userId = req.session.userId;
    const validation = validate(req.params, validator.deleteVote, { format: 'flat' });
    if (validation) {
        const error = responses.error(validation);
        res.status(500).send(error);
        return;
    }

    try { 
        let response = await (queries.deleteVote(req.params));
        response = responses.successWithData(response);
        res.status(200).send(response);

    } catch(error) {
        error = responses.error(error);
        res.status(500).send(error);

    }

});



    
module.exports = controller;