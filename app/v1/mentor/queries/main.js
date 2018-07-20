const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const utils = require('../../tools/utils');
const userModel = require('../../models/user');
const mentorshipModel = require('../../models/mentorship');
const topicModel = require('../../models/topic');


var request= {};

request.getAll = async ( (data) =>  {
    return new Promise( (resolve, reject) => {
        const mentors = await (userModel.user.findAll({ where : { type : 2 }}));
        resolve(mentors)
   });
    
});


request.create = async ((data) => {
    return new Promise( (resolve, reject) => {
       
        await (userModel.user.update(
                {
                    type : 2
                },
                {
                    where: { 
                        id: data.id
                    }
                }
            ));

        resolve('Mentor created');

    });
    
});

request.createTopic = async ((data) => {
    return new Promise( (resolve, reject) => {
        const userType =  await (userModel.user.find({ where: { id: data.mentorId } }));

        if(userType.type != 2){
                reject('Invalid mentor Id')
                return;
        }

        if(userType.type != 3 && data.mentorId != data.userId){
            reject('incorrect credentials');
            return;
        }   
       
        await ( userModel.mentorTopic.create(
            { 
              mentorId : data.mentorId,
              topicId :  data.topicId                                 
            }
        ));

        resolve('Topic created');

    });
    
});

request.deleteTopic = async ((data) => {
    return new Promise( (resolve, reject) => {
        const userType =  await (userModel.user.find({ where: { id: data.mentorId } }));

        if(userType.type != 2){
            reject('Invalid mentor Id')
            return;
        }

        if(userType.type != 3 && data.mentorId != data.userId){
            reject('Incorrect credentials');
            return;
        }   
        
        await (userModel.mentorTopic.destroy(
            {
                where: { 
                    mentorId: data.mentorId,
                    topicId : data.topicId
                }
            }
        ));
     
        resolve('Topic deleted')

    });
    
});


request.getMentorships = async ( (data) =>  {
    return new Promise( (resolve, reject) => {
        const userType =  await (userModel.user.find({ where: { id: data.userId } }));
        if(userType.type == 2){
            const mentorship =  await (mentorshipModel.mentorship.find({ where: { mentorId: data.userId } }));
            if(!mentorship){
                resolve([])
                return;
            }
            
            resolve(mentorship)
            return;
        }else{
            reject('incorrect credentials');
        }

         });
    
});

request.delete = async ((data) => {
    return new Promise( (resolve, reject) => {
       
        await (userModel.user.update(
                {
                    type : 1
                },
                {
                    where: { 
                        id: data.mentorId
                    }
                }
            ));

        resolve('Mentor created');

    });
    
});


module.exports = request;










