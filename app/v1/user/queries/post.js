const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const utils = require('../../tools/utils');
const userModel = require('../../models/user');
const postModel = require('../../models/post');

var request= {};

request.getAll = async ( (data) =>  {
    return new Promise( (resolve, reject) => {
        const posts = await (postModel.post.findAll({ where : { creatorId : data.userId } }));
        resolve(posts)
   });
    
});

module.exports = request;


