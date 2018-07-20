const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const utils = require('../../tools/utils');
const userModel = require('../../models/user');
const topicModel = require('../../models/topic');

var request= {};

request.getAll = async ( (data) =>  {
    return new Promise( (resolve, reject) => {
        const topics = await (topicModel.topic.findAll());
        resolve(topics)
   });
    
});

request.getTopic = async ((data) => {
    return new Promise( (resolve , reject ) => {
        const topic = await (topicModel.topic.find({ where: { id: data.id } }));
        if(!topic) {
            reject('No topic with that Id');
        }
        resolve(topic);
    })
});

request.create = async ((data) => {
    return new Promise( (resolve , reject ) => {
        let topic = await (topicModel.topic.find({ where: { title: data.title } }));
        if(topic) {
            reject('topic already exist');
        }

        await ( topicModel.topic.create(
            { 
                title: data.title, 
                description: data.description                             
            }
        ));

        topic = await (topicModel.topic.find({ where: { title: data.title, description : data.description } }));

        resolve(topic)

    });
    
});

request.update = async ((data) => {
    return new Promise( (resolve, reject) => {
        let topic = await (topicModel.topic.find({ where: { title: data.title } }));
        if(topic) {
            reject('topic already exist');
        }
      
        await (topicModel.topic.update(
            {
                title: data.title, 
                description: data.description
            },
            {
                where: { 
                    id: data.id
                }
            }
        ));
     
        topic = await (topicModel.topic.find({ where: { id: data.id } }));
        resolve(topic)

    });
    
});

request.delete = async ((data) => {
    return new Promise( (resolve, reject) => {
        const topic = await (topicModel.topic.find({ where: { id: data.id } }));
        
        await (topicModel.topic.destroy(
            {
                where: { 
                    id: data.id
                }
            }
        ));

        await (userModel.mentorTopic.destroy(
            {
                where: { 
                    topicId: data.id
                }
            }
        ));
     
        resolve('topic deleted')

    });
    
});


module.exports = request;


