const validate = require('validate.js');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const validator = require('../validator/main');
const responses = require('../../tools/responses');
const queries = require('../queries/main');


const controller = {};


controller.register = async ((req, res) => {
    const validation = validate(req.body, validator.register, { format: 'flat' });
    if (validation) {
        const error = responses.error(validation);
        res.status(500).send(error);
        return;
    }

    try { 
        let response = await (queries.register(req.body));
        response = responses.successWithData(response);
        res.status(200).send(response);

    } catch(error) {
        error = responses.error(error);
        res.status(500).send(error);

    }
});

controller.login = async ((req, res) => {
    const validation = validate(req.body, validator.login, { format: 'flat' });

    if (validation) {
        const error = responses.error(validation);
        res.status(500).send(error);
        return;
    }

    try { 
        let response = await (queries.login(req.body));
        response = responses.successWithData(response);
        res.status(200).send(response);

    } catch(error) {
        error = responses.error(error);
        res.status(500).send(error);

    }
});

controller.getUser = async ((req, res) => {
    req.params.userId = req.session.userId;
    const validation = validate(req.params, validator.getUser, { format: 'flat' });
    if (validation) {
        const error = responses.error(validation);
        res.status(500).send(error);
        return;
    }

    try { 
        let response = await ( queries.getUser(req.params) );
        response = responses.successWithData(response);
        res.status(200).send(response);

    } catch(error) {
        error = responses.error(error);
        res.status(500).send(error);

    }
});

controller.confirm = async ((req, res) => {

    const validation = validate(req.params, validator.confirm, { format: 'flat' });
    if (validation) {
        const error = responses.error(validation);
        res.status(500).send(error);
        return;
    }

    try { 
        let response = await ( queries.confirm(req.params) );
        response = responses.successWithData(response);
        res.status(200).send(response);

    } catch(error) {
        error = responses.error(error);
        res.status(500).send(error);

    }
});

controller.block = async ((req, res) => {
    const validation = validate(req.body, validator.block, { format: 'flat' });
    if (validation) {
        const error = responses.error(validation);
        res.status(500).send(error);
        return;
    }

    try { 
        let response = await ( queries.block(req.body) );
        response = responses.successWithData(response);
        res.status(200).send(response);

    } catch(error) {
        error = responses.error(error);
        res.status(500).send(error);

    }
});

controller.activate = async ((req, res) => {
    const validation = validate(req.body, validator.activate, { format: 'flat' });
    if (validation) {
        const error = responses.error(validation);
        res.status(500).send(error);
        return;
    }

    try { 
        let response = await ( queries.activate(req.body) );
        response = responses.successWithData(response);
        res.status(200).send(response);

    } catch(error) {
        error = responses.error(error);
        res.status(500).send(error);

    }
});

controller.getById = async ((req, res) => {
    req.params.userId = req.session.userId;
    const validation = validate(req.params, validator.getById, { format: 'flat' });
    if (validation) {
        const error = responses.error(validation);
        res.status(500).send(error);
        return;
    }

    try { 
        let response = await ( queries.getById(req.params) );
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

controller.updatePassword = async ((req, res) => {
    req.body.userId = req.session.userId;
    const validation = validate(req.body, validator.updatePassword, { format: 'flat' });
    if (validation) {
        const error = responses.error(validation);
        res.status(500).send(error);
        return;
    }

    try { 
        let response = await (queries.updatePassword(req.body));
        response = responses.successWithData(response);
        res.status(200).send(response);

    } catch(error) {
        error = responses.error(error);
        res.status(500).send(error);

    }

});


controller.restorePassword = async ((req, res) => {
    const validation = validate(req.body, validator.restorePassword, { format: 'flat' });
    if (validation) {
        const error = responses.error(validation);
        res.status(500).send(error);
        return;
    }
  
    try { 
        let response = await (queries.restorePassword(req.body));
        response = responses.successWithData(response);
        res.status(200).send(response);

    } catch(error) {
        error = responses.error(error);
        res.status(500).send(error);

    }

});

controller.restore = async ((req, res) => {
    const validation = validate(req.body, validator.restore, { format: 'flat' });
    if (validation) {
        const error = responses.error(validation);
        res.status(500).send(error);
        return;
    }
  
    try { 
        let response = await (queries.restore(req.body));
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
        let response = await ( queries.getMentorships(req.params) );
        response = responses.successWithData(response);
        res.status(200).send(response);

    } catch(error) {
        error = responses.error(error);
        res.status(500).send(error);

    }
});

    
module.exports = controller;