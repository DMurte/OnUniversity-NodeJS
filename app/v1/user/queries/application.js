const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const utils = require('../../tools/utils');
const userModel = require('../../models/user');

var request= {};

request.getAll = async ( (data) =>  {
    return new Promise( (resolve, reject) => {

        const applications =  await (userModel.application.find({ where: { userId: data.userId } }));

        resolve(applications)
        return;
 
   });
    
});

request.getApplication = async ((data) => {
    return new Promise( (resolve , reject ) => {
        const application =  await (userModel.application.find({ where: { id: data.id } }));
        const userType =  await (userModel.user.find({ where: { id: data.userId } }));

        if(application.userId != data.userId && userType != 3){
            reject('incorrect credentials');

        }else{
            resolve(application);

        }
    })
});

request.create = async ((data) => {
    return new Promise( (resolve , reject ) => {
        await ( userModel.application.create(
            { 
                startDate: data.startDate, 
                endDate: data.endDate, 
                userId: data.userId
            }
        )); 
        resolve('application created');

    });
    
});

request.update = async ((data) => {
    return new Promise( (resolve, reject) => {
        const application =  await (userModel.application.find({ where: { id: data.id } }));
        const userType =  await (userModel.user.find({ where: { id: data.userId } }));

        if(application.userId != data.userId && userType != 3){
            reject('incorrect credentials');

        }else{
            await (userModel.application.update(
                {
                    startDate: data.startDate, 
                    endDate: data.endDate, 
                },
                {
                    where: { 
                        id: data.id,
                        userId: data.userId
                    }
                }
            ));

            resolve('application updated');

        }
       
    });
    
});



request.cancel = async ((data) => {
    return new Promise( (resolve, reject) => {
        const application =  await (userModel.application.find({ where: { id: data.id } }));
        const userType =  await (userModel.user.find({ where: { id: data.userId } }));

        if(application.userId != data.userId && userType != 3){
            reject('incorrect credentials');

        }else{
      
        await (userModel.application.destroy(
            {
                where: { 
                    id: data.id
                }
            }
        ));

        resolve('application cancelled');

        }
    })    
});



module.exports = request;


